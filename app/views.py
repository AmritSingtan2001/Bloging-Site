from django.shortcuts import render
from rest_framework import generics
from .models import Category, Tag, Blog, Comment
from .serializers import CategorySerializer, TagSerializer, BlogSerializer, CommentSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryCreateAPIView(generics.CreateAPIView):
    queryset =Category.objects.all()
    serializer_class= CategorySerializer
    permission_classes =[IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response= super().post(request, *args, **kwargs)
        response.data['message']="Blog Created successfully"
        response.data['success']=True
        response.status_code = status.HTTP_201_CREATED
        return response

    

class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes =[IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        response.data['message']="Blog update successfully"
        response.data['success']=True
        response.status_code = status.HTTP_200_CREATED
        return response

    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        return Response({"message":"Category deleted successfully!!"})


class TagListAPIView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagCreateAPIView(generics.CreateAPIView):
    queryset =Tag.objects.all()
    serializer_class= TagSerializer
    permission_classes =[IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response= super().post(request, *args, **kwargs)
        response.data['message']="Tag Created successfully"
        response.data['success']=True
        response.status_code = status.HTTP_201_CREATED
        return response
    
class TagDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        response.data['message']="Tag update successfully"
        response.data['success']=True
        response.status_code = status.HTTP_200_CREATED
        return response

    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        return Response({"message":"Tag deleted successfully!!"})



class BlogListAPIView(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogCreateAPIView(generics.CreateAPIView):
    queryset =Blog.objects.all()
    serializer_class= BlogSerializer
    permission_classes =[IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response= super().post(request, *args, **kwargs)
        response.data['message']="Blog Created successfully"
        response.data['success']=True
        response.status_code = status.HTTP_201_CREATED
        return response

class BlogDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    # permission_classes =[IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        response.data['message']="Blog update successfully"
        response.data['success']=True
        response.status_code = status.HTTP_200_CREATED
        return response

    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        return Response({"message":"Blog deleted successfully!!"})


'''user rleated blog list'''
class UserRelatedBlogListView(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset= Blog.objects.filter(author = self.request.user)
        return queryset




class CommentListAPIView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentCreateAPIView(generics.CreateAPIView):
    queryset =Comment.objects.all()
    serializer_class= CommentSerializer
    permission_classes =[IsAuthenticated]

    
    def perform_create(self, serializer):
        serializer.save(commentor=self.request.user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            response_data = {
                'message': 'Comment Created successfully',
                'success': True,
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BlogCommentsListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog_id = self.kwargs['blog_id']  
        queryset = Comment.objects.filter(blog=blog_id)
        print(queryset)
        return queryset

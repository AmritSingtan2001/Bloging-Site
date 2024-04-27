from rest_framework import serializers
from .models import Category, Tag, Blog, Comment
from account.models import User 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']  

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True) 
    tags=TagSerializer(read_only=True,many=True)
    category =CategorySerializer(read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'creation_date', 'category', 'tags']

class CommentSerializer(serializers.ModelSerializer):
    commentor = UserSerializer(read_only=True) 
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'commentor', 'content', 'created_at']

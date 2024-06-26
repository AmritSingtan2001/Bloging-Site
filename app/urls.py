from django.urls import path
from .views import (
    CategoryListAPIView,CategoryCreateAPIView, CategoryDetailAPIView,
    TagListAPIView, TagDetailAPIView,TagCreateAPIView,
    BlogListAPIView, BlogUpdateDeleteAPIView,BlogDetailView,BlogCreateAPIView,UserRelatedBlogListView,
    CommentListAPIView, CommentCreateAPIView,BlogCommentsListAPIView
)

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/add/', CategoryCreateAPIView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('tags/', TagListAPIView.as_view(), name='tag-list'),
    path('tags/add/', TagCreateAPIView.as_view(), name='tag-add'),
    path('tags/<int:pk>/', TagDetailAPIView.as_view(), name='tag-detail'),
    path('blogs/', BlogListAPIView.as_view(), name='blog-list'),
    path('blogs/add/', BlogCreateAPIView.as_view(), name='blog-add'),
    path('blogs/<int:blog_id>/comments/',BlogCommentsListAPIView.as_view(), name='blog-related-comments'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('blogs/update/<int:pk>/', BlogUpdateDeleteAPIView.as_view(), name='blog-update'),
    path('blogs/delete/<int:pk>/', BlogUpdateDeleteAPIView.as_view(), name='blog-delete'),


    path('user/blog', UserRelatedBlogListView.as_view(), name='user_related_blog'),
    path('comments/', CommentListAPIView.as_view(), name='comment-list'),
    path('comments/create/', CommentCreateAPIView.as_view(), name='comment-create'),
]

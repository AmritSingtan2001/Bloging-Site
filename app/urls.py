from django.urls import path
from .views import (
    CategoryListAPIView, CategoryDetailAPIView,
    TagListAPIView, TagDetailAPIView,
    BlogListAPIView, BlogDetailAPIView,
    CommentListAPIView, CommentDetailAPIView,
)

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('tags/', TagListAPIView.as_view(), name='tag-list'),
    path('tags/<int:pk>/', TagDetailAPIView.as_view(), name='tag-detail'),
    path('blogs/', BlogListAPIView.as_view(), name='blog-list'),
    path('blogs/<int:pk>/', BlogDetailAPIView.as_view(), name='blog-detail'),
    path('comments/', CommentListAPIView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetailAPIView.as_view(), name='comment-detail'),
]

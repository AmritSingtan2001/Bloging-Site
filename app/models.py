from django.db import models
from account.models import User

class Category(models.Model):
    name = models.CharField(verbose_name='Category Name',max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name

class Tag(models.Model):
    name = models.CharField(verbose_name='Tag Name',max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name

class Blog(models.Model):
    title = models.CharField(verbose_name='Blog Title',max_length=255)
    content = models.TextField(verbose_name='Descriptions ')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_author',verbose_name='Author Name')
    creation_date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, related_name='blogs', verbose_name='Blog Category',on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='blogs', verbose_name='Tag Name')

    def __str__(self) -> str:
        return self.title
    

class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments', verbose_name='Bloh')
    commentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commenter', verbose_name='Commentor Name')
    content = models.TextField(verbose_name='Comment')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'

    def __str__(self):
        return f'Comment by {self.author.username} on {self.blog.title}'
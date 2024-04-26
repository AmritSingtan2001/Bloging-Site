from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, related_name='blogs', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='blogs')

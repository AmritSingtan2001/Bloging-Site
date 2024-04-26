from django.db import models

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
    author = models.CharField(verbose_name='Author Name',max_length=100)
    creation_date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, related_name='blogs', verbose_name='Blog Category',on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='blogs', verbose_name='Tag Name')

    def __str__(self) -> str:
        return self.title
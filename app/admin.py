from django.contrib import admin
from .models import Category, Tag, Blog,Comment

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Category, CategoryAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Tag, TagAdmin)


class CommentAdmin(admin.TabularInline):
    model = Comment

class BlogAdmin(admin.ModelAdmin):
    inlines =[CommentAdmin]
    list_display = ['title', 'author', 'creation_date', 'category_display']

    def category_display(self, obj):
        return obj.category.name
    
    category_display.short_description = 'Category'

admin.site.register(Blog, BlogAdmin)

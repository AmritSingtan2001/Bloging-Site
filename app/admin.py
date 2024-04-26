from django.contrib import admin
from .models import Category, Tag, Blog

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Category, CategoryAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Tag, TagAdmin)

class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'creation_date', 'category_display']

    def category_display(self, obj):
        return obj.category.name
    
    category_display.short_description = 'Category'

admin.site.register(Blog, BlogAdmin)

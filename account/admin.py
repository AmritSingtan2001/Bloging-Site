from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from account.models import User
class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'name',  'phone_No', 'is_user', 'is_admin')
    list_filter = ('is_admin','is_user')
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'phone_No')}),
        ('Permissions', {'fields': ('is_admin','is_user')}),  # Exclude groups and user_permissions
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email', 'id')
    
admin.site.register(User, UserModelAdmin)


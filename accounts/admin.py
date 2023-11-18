# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import Account

# admin.site.register(Account, UserAdmin)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User  # Import the built-in User model


class UserProfileInline(admin.StackedInline):
    model = User  # Replace with your actual UserProfile model


class CustomUserAdmin(UserAdmin):
    inlines = [UserProfileInline]

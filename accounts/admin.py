from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserAccount


class CustomUserAdmin(BaseUserAdmin):
    model = UserAccount


admin.site.register(UserAccount, CustomUserAdmin)

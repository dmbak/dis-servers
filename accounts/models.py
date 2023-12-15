from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _


class UserAccount(AbstractUser):
    # your other fields and methods

    # Add or modify related_name for groups
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='user_accounts_groups',  # Change this line
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
    )

    # Add or modify related_name for user_permissions
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='user_accounts_permissions',  # Change this line
        help_text=_('Specific permissions for this user.'),
    )

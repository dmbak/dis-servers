from django.db import models
from django.conf import settings


class Server(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=500, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='server_owner')
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name

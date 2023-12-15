# Generated by Django 4.2.3 on 2023-11-18 14:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('description', models.CharField(max_length=500, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='server_owner', to=settings.AUTH_USER_MODEL)),
                ('member', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

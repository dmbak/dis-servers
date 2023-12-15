# from rest_framework import serializers
# from .models import UserAccount
# from rest_framework.authtoken.models import Token


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = ['id', 'username', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = UserAccount.objects.create_user(**validated_data)
#         return user

from rest_framework import serializers
from .models import UserAccount  # Assuming your custom user model is in models.py


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount  # Update to your custom user model
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserAccount.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

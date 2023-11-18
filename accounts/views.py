from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer

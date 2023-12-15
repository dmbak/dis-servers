from rest_framework import serializers
from .models import Server, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'server', 'content', 'timestamp']


class ServerSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Server
        fields = '__all__'

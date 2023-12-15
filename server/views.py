from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from .models import Server
from .serializer import ServerSerializer


class ServerListView(viewsets.ViewSet):
    servers_list = Server.objects.all()

    def list(self, request):
        name = request.query_params.get('name')
        by_id = request.query_params.get('by_id')
        by_user = request.query_params.get('by_user') == 'true'

        if by_id and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if name:
            self.servers_list = self.servers_list.filter(name=name)

        if by_id:
            try:
                self.servers_list = self.servers_list.filter(id=by_id)
                if not self.servers_list.exists():
                    raise ValidationError(
                        detail=f"Server {by_id} doesn't exist")
            except ValueError:
                raise ValidationError(
                    detail=f"Server {by_id} doesn't exist")

        if by_user:
            user_id = request.user.id
            self.servers_list = self.servers_list.filter(member=user_id)

        serializer = ServerSerializer(self.servers_list, many=True)
        return Response(serializer.data)


def room(request, room_name):
    return render(request, "server/room.html", {"room_name": room_name})


def index(request):
    return render(request, "server/index.html")

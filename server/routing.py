# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.urls import path
# from servers.consumers import ChatConsumer

# websocket_urlpatterns = ProtocolTypeRouter({
#     "websocket": URLRouter(
#         [
#             path("ws/chat/<int:server_id>/", ChatConsumer.as_asgi()),
#         ]
#     ),
# })

from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
]

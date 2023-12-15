from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from server.views import ServerListView
from server.views import room

router = DefaultRouter()
router.register("api/servers", ServerListView, basename='languages')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),
    # path('ws/', channels_application),
    path("chat/", include("server.urls")),


] + router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

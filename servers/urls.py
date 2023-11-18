# from django.conf import settings
# from django.conf.urls.static import static
# from django.contrib import admin
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from server.views import ServerListView
# # from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# router = DefaultRouter()
# router.register("api/servers", ServerListView, basename='languages')

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ] + router.urls

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,
#                           document_root=settings.MEDIA_ROOT)

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from server.views import ServerListView

router = DefaultRouter()
router.register("api/servers", ServerListView, basename='languages')

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include other user-related URLs from the "accounts" app under the 'accounts' namespace
    path('api/accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),

] + router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

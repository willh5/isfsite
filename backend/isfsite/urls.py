from django.contrib import admin
from django.urls import path, include, re_path
#from django.views.generic import TemplateView
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from .views import ExTokenObtainPairView

router = routers.DefaultRouter()
router.register('firms', views.FirmViewSet, basename='firm')
router.register('scope1', views.Scope1ViewSet, basename='scope1')
router.register('sectors', views.SectorViewSet, basename='sector')
router.register('locations', views.LocationViewSet, basename='location')
# router.register('token', TokenObtainPairView.as_view(), basename='token_obtain_pair')
# router.register('token/refresh', TokenRefreshView.as_view(), basename='token_refresh')



urlpatterns = [
#re_path('login', views.login),
#re_path('signup', views.signup)
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', ExTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ]

urlpatterns += router.urls




# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", include(isfsite.urls),
#     #path("", TemplateView.as_view(template_name="index.html")),
# ]

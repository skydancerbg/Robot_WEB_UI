from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('rosweb/', views.rosweb, name='rosweb'),
]
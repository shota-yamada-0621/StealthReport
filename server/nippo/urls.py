from django.urls import path
from . import views

app_name = 'nippo'
urlpatterns = [
    path('', views.NippoIndex.as_view(), name='index'),
    # path('form/', views.CreateNippo.as_view(), name='form')
    # path('.\success', views.NippoCreateSuccess.as_view(),name='success')
]
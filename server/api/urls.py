from django.urls import path
from . import views

app_name = 'API'
urlpatterns = [
    path('', views.NippoIndexviews.as_view()),
    path('detail/<pk>/', views.NippoDetailview.as_view()),
    path('update/<pk>/', views.NippoUpdateview.as_view()),
    path('delete/<pk>/', views.NippoDestroyview.as_view()),
    path('create/', views.NippoCreateview.as_view()),
    path('login/', views.LoginView.as_view()),
    path('signup/', views.SignupView.as_view()),
]
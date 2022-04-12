from django.urls import path
from . import views
urlpatterns = [
    path('all/', views.blog_all),
    path('details/<int:pk>/', views.details),
    
]

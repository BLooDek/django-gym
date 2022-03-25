from django.urls import path
from .views import all_events, add_event, update_event, delete_event

urlpatterns = [
    path('all/', all_events, name='calendar'),
    path('add/', add_event, name='add_event'),
    path('update/', update_event, name='update_event'),
    path('delete/', delete_event, name='delete_event'),
]

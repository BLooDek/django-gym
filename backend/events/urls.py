from django.urls import path
from .views import all_events, add_event, update_event, delete_event, signout_from_event, signup_for_event, get_trainers

urlpatterns = [
    path('all/', all_events, name='calendar'),
    path('add/', add_event, name='add_event'),
    path('update/', update_event, name='update_event'),
    path('delete/', delete_event, name='delete_event'),
    path('trainers/', get_trainers, name='get_trainers'),
    path('signup/', signup_for_event, name='signup'),
    path('signout/', signout_from_event, name='signout'),
]

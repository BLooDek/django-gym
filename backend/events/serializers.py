from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import Event, Trainer


class EventSerializer(serializers.ModelSerializer):
    isParticipant = serializers.SerializerMethodField('get_participant')
    color = serializers.SerializerMethodField('get_color')

    class Meta:
        model = Event
        fields = '__all__'

    def get_participant(self, obj):
        if self.context.get('user') in obj.members.all():
            return True
        return False

    def get_color(self, obj):
        if self.context.get('user') in obj.members.all():
            return 'blue'
        return '#6415ff'


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = '__all__'
        depth = 1

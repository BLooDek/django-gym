from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # fields = ('username','email', 'last_login', 'date_joined', 'is_staff')
        fields = '__all__'

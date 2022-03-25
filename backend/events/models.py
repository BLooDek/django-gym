from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Event(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True, blank=True)
    daysOfWeek = models.CharField(max_length=255, null=True, blank=True)
    trainer = models.CharField(max_length=255, null=True, blank=True)
    max_members = models.IntegerField(default=10)
    members = models.ManyToManyField(User, blank=True)
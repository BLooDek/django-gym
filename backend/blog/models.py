from django.contrib.auth.models import User
from django.db import models


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)
    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, unique=False)
    body = models.TextField()

    class Meta:
        ordering = ['created']


class Post(models.Model):
    title = models.CharField(max_length=200)
    headline = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)
    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, unique=False)
    comments = models.ManyToManyField(Comment, blank=True)

    class Meta:
        ordering = ['published']

    def __str__(self):
        return self.title

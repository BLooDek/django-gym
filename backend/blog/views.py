from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from config import customPermissions
from .models import Post
from .serializers import PostSerializer, DetailPostSerializer
from .pagination import PostDefaultResultsSetPagination


@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes((customPermissions.IsAdminOrReadOnly,))
def blog_all(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        Post.objects.filter(id=request.data.get(
            'id')).update(is_published=False)
    posts = Post.objects.all().filter(is_published=True)
    if len(posts) > 0:
        paginator = PostDefaultResultsSetPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    else:
        return Response({}, status=status.HTTP_200_OK)


@api_view(['GET', 'PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes((customPermissions.IsAdminOrReadOnly,))
def details(request, pk):
    post = Post.objects.get(pk=pk)
    if request.method == 'PATCH':
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            serializer = DetailPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer = DetailPostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)
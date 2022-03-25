from rest_framework import status, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer


# Create your views here.
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes((permissions.AllowAny,))
def all_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, context={'user': request.user}, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes((permissions.IsAdminUser,))
def add_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        events = Event.objects.all()
        serializer = EventSerializer(events, context={'user': request.user}, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes((permissions.IsAdminUser,))
def update_event(request):
    # print(request.data.get('id'))
    event = Event.objects.get(pk=request.data.get('id'))
    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        events = Event.objects.all()
        serializer = EventSerializer(events, context={'user': request.user}, many=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes((permissions.IsAdminUser,))
def delete_event(request):
    event = Event.objects.get(pk=request.data.get('id'))
    event.delete()
    events = Event.objects.all()
    serializer = EventSerializer(events, context={'user': request.user}, many=True)
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

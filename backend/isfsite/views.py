from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from isfsite.models import *
from rest_framework.decorators import action
from rest_framework.response import Response
# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django_filters import rest_framework
from isfsite.filters import FirmFilter, Scope1Filter, SectorFilter, LocationFilter



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

#from rest_framework import status
#from rest_framework.authtokens.models import Token
from django.contrib.auth.models import User
#from django.shortcuts import get_object_or_404


from rest_framework.decorators import authentication_classes, permission_classes
# from rest_framework.authentication import SessionAuthentication, TokenAuthentication
# from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class ExTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class ExTokenObtainPairView(TokenObtainPairView):
    serializer_class=ExTokenObtainPairSerializer
#c ass FirmSectorFilter(rest_framework.FilterSet):
 #   name = rest_framework.CharFilter(field_name='sector__name', lookup_expr='iexact')

  #  class Meta:
   #     fields = ("name",)
    #    model = UserEmployment

# @api_view(['POST'])
# def login(request):
#     user = get_object_or_404(User, username=request.data['username'])
#     if not user.check_password(request.data['password']):
#         return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
#     token, created = Token.objects.get_or_create(user=user)
#     serializer = UserSerializer(instance=user)
#     return Response({"token":token.key, "user":serializer.data})



# @api_view(['POST'])
# def signup(request):
#     serializer= serializers.UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         user = User.objects.get(username=request.data['username'])
#         user.set_password(request.data['password'])
#         user.save()
#         token=Token.objects.create(user=user)
#         return Response({"token": token.key, "user": serializer.data})
#     return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)




class SectorViewSet(viewsets.ModelViewSet):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    #permission_classes = [IsAuthenticated]
    pagination_class = None

    queryset = Sector.objects.all()
    serializer_class = serializers.SectorSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class=SectorFilter
    search_fields = ['name']


class LocationViewSet(viewsets.ModelViewSet):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    #permission_classes = [IsAuthenticated]
    pagination_class = None

    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class=LocationFilter
    search_fields = ['name']



class Scope1ViewSet(viewsets.ModelViewSet):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Scope1.objects.all()
    serializer_class = serializers.Scope1Serializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    #filterset_fields=("sector__name",)
    filterset_class=Scope1Filter
    search_fields = ['firm__name']


class FirmViewSet(viewsets.ModelViewSet):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    #pagination_class = None

    queryset = Firm.objects.all()
    serializer_class = serializers.FirmSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    #filterset_fields=("sector__name",)
    filterset_class=FirmFilter
    search_fields = ['name' , 'sector__id', 'hq_location__name']

    @action(detail=True)
    def targetlist(self, request, pk=None):
        firm1 = self.get_object()
        targets = Target.objects.filter(firm=firm1).distinct()
        targets_json = serializers.TargetSerializer(targets, many=True)
        return Response(targets_json.data)

    @action(detail=True)
    def firmdata(self, request, pk=None):
        firm1 = self.get_object()
        data = Quant.objects.filter(firm=firm1).distinct()
        data_json = serializers.QuantSerializer(data, many=True)
        return Response(data_json.data)


    @action(detail=True)
    def scope1(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope1.objects.filter(firm=firm1).distinct()
        data_json = serializers.Scope1Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope1_loc(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope1.objects.filter(firm=firm1, location_based=True).distinct()
        data_json = serializers.Scope1Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope1_hq(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope1.objects.filter(firm=firm1, location_based=False).distinct()
        data_json = serializers.Scope1Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope2(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope2.objects.filter(firm=firm1).distinct()
        data_json = serializers.Scope2Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope2_loc(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope2.objects.filter(firm=firm1, location_based=True).distinct()
        data_json = serializers.Scope2Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope2_hq(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope2.objects.filter(firm=firm1, location_based=False).distinct()
        data_json = serializers.Scope2Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def scope3(self, request, pk=None):
        firm1 = self.get_object()
        data = Scope3.objects.filter(firm=firm1).distinct()
        data_json = serializers.Scope3Serializer(data, many=True)
        return Response(data_json.data)

    @action(detail=True)
    def isins(self, request, pk=None):
        firm1 = self.get_object()
        data = ISIN.objects.filter(firm=firm1).distinct()
        data_json = serializers.ISINSerializer(data, many=True)
        return Response(data_json.data)


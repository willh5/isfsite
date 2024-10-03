from django_filters.rest_framework import FilterSet

from isfsite.models import *


class FirmFilter(FilterSet):


    class Meta:
        model = Firm
        fields={
            "name" : ['icontains'],
            "sector__id" : ['iexact'],
            "hq_location__name" : ['icontains'],
            }




class Scope1Filter(FilterSet):


    class Meta:
        model = Scope1
        fields={
            "date" : ['lt', 'gte'],
            "value" : ['lt', 'gt'],
            "location__name" : ['icontains'],
            }



class SectorFilter(FilterSet):


    class Meta:
        model = Sector
        fields={
           "name" : ['icontains'],
            }

class LocationFilter(FilterSet):


    class Meta:
        model = Location
        fields={
           "name" : ['icontains'],
            }
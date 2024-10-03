from rest_framework import serializers
# from blog.models import Post
from django.conf import settings

from isfsite.models import *
from django.contrib.auth.models import User
# ******* COMMANDS:

# >>> from blog_api.serializers import *
# >>> serializer = QuantSerializer()
# >>> print(repr(serializer))
# qset=Quant.objects.all()[0]
# QuantSerializer(qset)
# serializer=QuantSerializer(qset)
# serializer.data

# from blog_api.serializers import *
# serializer = QuantSerializer()
# print(repr(serializer))
# qset = Quant.objects.all()[0]
# QuantSerializer(qset)
# serializer = QuantSerializer(qset)
# serializer.data

# from blog_api.serializers import *
# serializer = FirmSerializer()
# qset = Firm.objects.all()[0]
# serializer = FirmSerializer(qset)
# serializer.data


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ('id', 'title', 'author', 'excerpt', 'content', 'status')


# class UserRegisterSerializer(serializers.ModelSerializer):

#     email = serializers.EmailField(required=True)
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(min_length=8, write_only=True)

#     class Meta:
#         model = settings.AUTH_USER_MODEL
#         fields = ('email', 'user_name', 'first_name')
#         extra_kwargs = {'password': {'write_only': True}}


# class FirmSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Firm
#         fields = ['name']


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=User
        fields=['id', 'username', 'password', 'email']





class CustomSerializer(serializers.HyperlinkedModelSerializer):

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(CustomSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields


class TargetDataSerializer(serializers.ModelSerializer):
    # data2 = FirmSerializer(many=True, read_only=True)
    # foreign key = firm is listed under class Quant so you can do this below , otherwise it just returns the firm id.
    target = serializers.StringRelatedField()
    # date = serializers.DateTimeField(format='%Y')

    class Meta:
        model = TargetData
        fields = '__all__' #('date', 'value', 'firm')

class TargetSerializer(serializers.ModelSerializer):
    # data2 = FirmSerializer(many=True, read_only=True)
    # foreign key = firm is listed under class Quant so you can do this below , otherwise it just returns the firm id.
    firm = serializers.StringRelatedField()
    data=TargetDataSerializer(many=True, read_only=True)
    # date = serializers.DateTimeField(format='%Y')

    class Meta:
        model = Target
        fields = '__all__' #('date', 'value', 'firm')


class ISINSerializer(serializers.ModelSerializer):
    # data2 = FirmSerializer(many=True, read_only=True)
    # foreign key = firm is listed under class Quant so you can do this below , otherwise it just returns the firm id.
    firm = serializers.StringRelatedField()
    # date = serializers.DateTimeField(format='%Y')

    class Meta:
        model = ISIN
        fields = '__all__' #('date', 'value', 'firm')


class SectorSerializer(serializers.ModelSerializer):
    # data2 = FirmSerializer(many=True, read_only=True)
    # foreign key = firm is listed under class Quant so you can do this below , otherwise it just returns the firm id.
    firm = serializers.StringRelatedField()
    # date = serializers.DateTimeField(format='%Y')

    class Meta:
        model = Sector
        fields = '__all__' #('date', 'value', 'firm')


class QuantSerializer(serializers.ModelSerializer):
    # data2 = FirmSerializer(many=True, read_only=True)
    # foreign key = firm is listed under class Quant so you can do this below , otherwise it just returns the firm id.
    firm = serializers.StringRelatedField()
    # date = serializers.DateTimeField(format='%Y')

    class Meta:
        model = Quant
        fields = '__all__' #('date', 'value', 'firm')

    # def to_representation(self, instance):
    #     rep = super(QuantSerializer, self).to_representation(instance)
    #     rep['firm'] = instance.firm.name
    #     return rep


class FirmSerializer(serializers.ModelSerializer):
    # have to do nested queries on the foreign key. (Had it the other way at first)
    # also have to use the name from related_name from the Firm foreign key line of code under the Class Quant. related name in this data is "data2"

    #location = QuantSerializer(source='firm_quant', many=True, read_only=True)
    #sector_name = serializers.StringRelatedField(source='sector_set',read_only=True)
    #sector_name = serializers.CharField(source="sector.name", read_only=True)
    #sector_name = serializers.CharField(source='author')
    #sector_name = serializers.CharField(source='sector.name')

    sector = serializers.CharField(source='sector.name')
    hq_location = serializers.CharField(source='hq_location.name')
    #loc_name=LocationSerializer(source='firm_loc', many=False, read_only=True)
    #hq_location = serializers.CharField(source='location.name')


    #subsector = serializers.CharField(source='subsector.name')

    #hq_location = serializers.CharField(source='hq_location.name')
    #hq_location = serializers.SlugRelatedField('name', readonly=True)

    class Meta:
        model = Firm
        fields = '__all__'
        #fields = ['name', 'sector' , 'hq_location']
        #extra_fields = ['sector_name']


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'

class Scope1Serializer(serializers.ModelSerializer):
    firm = serializers.StringRelatedField()
    metric = serializers.CharField(source='metric.name')
    source = serializers.CharField(source='source.name')
    unit = serializers.CharField(source='unit.name')
    location = serializers.CharField(source='location.name')


    class Meta:
        model = Scope1
        fields = '__all__'

class Scope2Serializer(serializers.ModelSerializer):
    firm = serializers.StringRelatedField()

    metric = serializers.CharField(source='metric.name')
    source = serializers.CharField(source='source.name')
    unit = serializers.CharField(source='unit.name')
    location = serializers.CharField(source='location.name')

    class Meta:
        model = Scope2
        fields = '__all__'

class Scope3Serializer(serializers.ModelSerializer):
    firm = serializers.StringRelatedField()

    class Meta:
        model = Scope3
        fields = '__all__'

class IntensitySerializer(serializers.ModelSerializer):
    firm = serializers.StringRelatedField()

    class Meta:
        model = Intensity
        fields = '__all__'





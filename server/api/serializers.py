from rest_framework import serializers
from nippo.models import Nippo
from django.contrib.auth.models import User


class NippoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nippo
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only':True}}
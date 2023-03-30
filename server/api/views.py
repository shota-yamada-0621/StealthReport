from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import status, views, generics
from rest_framework.response import Response
from .serializers import NippoSerializer, UserSerializer
from nippo.models import Nippo
import openpyxl
from django.conf import settings
import os
import shutil
from api.logics.excel_create import DateInputExcel
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


class NippoCreateview(generics.CreateAPIView):
    
    serializer_class = NippoSerializer
    
    def post(self, request, *args, **kwargs):
        
        # エクセルを開き、そこにデータを書き込んで保存するロジック
        study_content = request.data.get('study_content')
        meeting_check = request.data.get('meeting_check')
        lessen_check = request.data.get('lessen_check')
        impressions = request.data.get('impressions')
        report_direction = request.data.get('report_direction')
        new_select_date = request.data.get('select_date')
        duplication_record = Nippo.objects.filter(select_date__startswith=new_select_date[0:10])
        if duplication_record:
            duplication_record.delete()
        ai_check = request.data.get('ai_check')
        test_object = DateInputExcel(new_select_date, study_content, meeting_check, impressions, lessen_check, report_direction, ai_check)
        test_object.Input_excel()
        if test_object.Input_excel() == False:
            test_object.value_set()
        request.data['impressions'] = test_object.return_impression()

        return super().post(request, *args, **kwargs)

class NippoIndexviews(generics.ListAPIView):

    queryset = Nippo.objects.all()
    serializer_class = NippoSerializer

class NippoDetailview(generics.RetrieveAPIView):
    
    queryset = Nippo.objects.all()
    serializer_class = NippoSerializer

class NippoUpdateview(generics.UpdateAPIView):
    
    queryset = Nippo.objects.all()
    serializer_class = NippoSerializer

class NippoDestroyview(generics.DestroyAPIView):
    
    queryset = Nippo.objects.all()
    
class LoginView(APIView):
    
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, create = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.create_user(username, password)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

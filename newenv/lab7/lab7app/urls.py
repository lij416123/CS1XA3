
from django.shortcuts import render
from django.contrib import admin
# Create your views here.
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_vars , name='lab7app'),
]


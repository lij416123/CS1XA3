from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def post_vars(request):
  name = request.GET.get("name","")
  password = request.GET.get("password","")
  passwordAgain =request.GET.get("passwordAgain","")
  if name=="Jimmy" and password=="Hendrix" and password==passwordAgain:
        return HttpResponse("Cool")
  else:
        return HttpResponse("Bad User Name")

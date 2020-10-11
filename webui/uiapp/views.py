from django.http import HttpResponse
from django.shortcuts import render
import xml.etree.ElementTree as et
from django.views.decorators.csrf import csrf_exempt
from time import localtime, strftime
from os.path import expanduser
import os
import subprocess
from uiapp.models import Waypoint
import json

# NB: fqdn stands for fully qualified domain name

#set variable based on the simulation used
active_sim = "tb2"
#  active_sim = "tb3"
#  active_sim = "servicesim"
#  active_sim = "op3"

def dashboard(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "dashboard",
      'sim': active_sim }
    return render(request, 'dashboard.html', context)

def teleop(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "teleop",
      'sim': active_sim }
    return render(request, 'teleop.html', context)

def teleopv1(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "teleopv1",
      'sim': active_sim }
    return render(request, 'teleopv1.html', context)
    
def tasks(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "tasks",
      'sim': active_sim }
    return render(request, 'tasks.html', context)

# def navigation(request):
#     context = {'fqdn': request.get_host().rsplit(':', 1)[0],
#     }
#     return render(request, 'navigation.html', context)

def smarthomeui(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "smarthomeui",
      'sim': active_sim }
    return render(request, 'smarthomeui.html', context)

def healthdata(request):
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0],
      'page': "smarthomeui",
      'sim': active_sim }
    return render(request, 'healthdata.html', context)

# def navigation(request):
#     context = {'fqdn': request.get_host().rsplit(':', 1)[0] }
#     return render(request, 'navigation.html', context)

@csrf_exempt
def navigation(request, action=""):
    if action == 'save':
      try:
        t = Waypoint(name=request.POST['name'], x=request.POST['x'], y=request.POST['y'], theta=request.POST['theta'])
        t.save()
        return HttpResponse(json.dumps({'id' : t.id, 'name' : t.name, 'x' : t.x, 'y' : t.y, 'theta' : t.theta}), content_type="application/json")
      except:
        return HttpResponse("error")
    elif action == 'remove':
      try:
        t = Waypoint.objects.get(id=request.POST['id'])
        t.delete()
        return HttpResponse(request.POST['id'])
      except:
        return HttpResponse("error")
    context = {
      'fqdn': request.get_host().rsplit(':', 1)[0], 'waypoints': Waypoint.objects.order_by('id'),
      'page': "navigation",
      'sim': active_sim }
    return render(request, 'navigation.html', context)

# def local(request):
#     context = {'fqdn': request.get_host().rsplit(':', 1)[0] }
#     return render(request, 'local.html', context)

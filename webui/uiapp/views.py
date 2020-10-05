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


def dashboard(request):
    context = {'domainname': request.get_host().rsplit(':', 1)[0] }
    return render(request, 'dashboard.html', context)

def teleop(request):
    context = {'domainname': request.get_host().rsplit(':', 1)[0] }
    return render(request, 'teleop.html', context)

# def navigation(request):
#     context = {'domainname': request.get_host().rsplit(':', 1)[0],
#     }
#     return render(request, 'navigation.html', context)

def smarthomeui(request):
    context = {'domainname': request.get_host().rsplit(':', 1)[0],
    }
    return render(request, 'smarthomeui.html', context)

def healthdata(request):
    context = {'domainname': request.get_host().rsplit(':', 1)[0],
    }
    return render(request, 'healthdata.html', context)

# def navigation(request):
#     context = {'domainname': request.get_host().rsplit(':', 1)[0] }
#     return render(request, 'navigation.html', context)

@csrf_exempt
def navigation(request, action=""):
    print ("vleze")
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
    context = {'domainname': request.get_host().rsplit(':', 1)[0], 'waypoints': Waypoint.objects.order_by('id') }
    return render(request, 'navigation.html', context)

# def local(request):
#     context = {'domainname': request.get_host().rsplit(':', 1)[0] }
#     return render(request, 'local.html', context)

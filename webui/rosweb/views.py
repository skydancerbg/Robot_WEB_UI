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


def rosweb(request):
    context = {'domainname': request.get_host().rsplit(':', 1)[0] }
    return render(request, 'rosweb.html', context)
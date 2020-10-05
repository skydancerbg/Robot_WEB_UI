from django.contrib import admin

# Register your models here.

# https://stackoverflow.com/questions/57341155/set-django-admin-to-display-all-the-columns-of-the-database
# from models import <Your_Model_Name>

# class Admin<Your_Model_Name>(admin.ModelAdmin):
#     model = <Your_Model_Name>
#     list_display = ('column1', 'column2', 'column3')

# admin.site.register(<Your_Model_Name>, Admin<Your_Model_Name>)

from uiapp.models import Waypoint, Bloodpressure


class AdminWaypoint(admin.ModelAdmin):
    model = Waypoint
    list_display = ('name', 'x', 'y', 'theta')
    # list_display = Waypoint._meta.get_fields() # Depreciated!!
    # list_display = [field.name for field in Book._meta.fields if field.name != "id"] # if we do not want to see the ManyToManyField fields
    # https://stackoverflow.com/questions/10543032/how-to-show-all-fields-of-model-in-admin-page
    # list_display = [field.name for field in Waypoint._meta.get_fields()] #see all fields

admin.site.register(Waypoint, AdminWaypoint)

class AdminBloodpressure(admin.ModelAdmin):
    model = Bloodpressure
    list_display = ('datetime_measured', 'systolic', 'diastolic', 'comment')
    # list_display = Waypoint._meta.get_fields() # Depreciated!!
    # list_display = [field.name for field in Book._meta.fields if field.name != "id"] # if we do not want to see the ManyToManyField fields
    # https://stackoverflow.com/questions/10543032/how-to-show-all-fields-of-model-in-admin-page
    # list_display = [field.name for field in Waypoint._meta.get_fields()] #see all fields

admin.site.register(Bloodpressure, AdminBloodpressure)
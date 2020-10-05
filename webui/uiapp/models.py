from django.db import models
from django.utils import timezone

class Waypoint(models.Model):
    name = models.CharField(max_length=16)
    x = models.FloatField()
    y = models.FloatField()
    theta = models.FloatField()

    # class Meta:
    #     db_table="student_profile"

# https://stackoverflow.com/questions/57341155/set-django-admin-to-display-all-the-columns-of-the-database
# https://stackoverflow.com/questions/10543032/how-to-show-all-fields-of-model-in-admin-page




#https://www.youtube.com/watch?v=aHC3uTkT9r8&t=9s
class Bloodpressure(models.Model):
    datetime_measured = models.DateTimeField(default=timezone.now)
    systolic = models.PositiveIntegerField()
    diastolic = models.PositiveIntegerField()
    comment = models.TextField(blank=True)

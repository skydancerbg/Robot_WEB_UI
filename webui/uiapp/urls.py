from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView
# from uiapp import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('teleop/', views.teleop, name='teleop'),
    path('teleopv1/', views.teleopv1, name='teleopv1'),
    re_path(r'^navigation/(?P<action>\S+)/', views.navigation, name='navigation'),
    path('navigation/', views.navigation, name='navigation'),
    path('actionsandtasks/', views.actionsandtasks, name='actionsandtasks'),
    path('smarthome/', views.smarthomeui, name='smarthomeui'),
    path('healthdata/', views.healthdata, name='healthdata'),
    path('about/', views.about, name='about'),

    # path('', TemplateView.as_view(template_name='dashboard.html')),
    # path('dashboard/', TemplateView.as_view(template_name='dashboard.html')),
    # path('teleop/', TemplateView.as_view(template_name='teleop.html')),
    # path('navigation/', TemplateView.as_view(template_name='navigation.html')),    
    # path('smarthome/', TemplateView.as_view(template_name='smarthomeui.html')),      
    # path('healthdata/', TemplateView.as_view(template_name='healthdata.html')),      
    # path('tst/', TemplateView.as_view(template_name='tst.html')),
    # path('tstnav/', TemplateView.as_view(template_name='tstnav.html')),

]

# from django.urls import include, path

# from uiapp import views

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path('', TemplateView.as_view(template_name='base.html')),
#     path('', TemplateView.as_view(template_name='dashboard.html')),
#     path('dashboard/', TemplateView.as_view(template_name='dashboard.html')),
#     path('teleop/', TemplateView.as_view(template_name='teleop.html')),
#     path('navigation/', TemplateView.as_view(template_name='navigation.html')),    
#     path('smarthome/', TemplateView.as_view(template_name='smarthomeui.html')),      
#     path('healthdata/', TemplateView.as_view(template_name='healthdata.html')),      
#     path('tst/', TemplateView.as_view(template_name='tst.html')),
# ]



# urlpatterns = patterns('',
#     url(r'^local/', views.local, name='local'),
#     url(r'^tracking/', views.tracking, name='tracking'),
#     url(r'^navigation/(?P<action>\S+)/', views.navigation, name='navigation'),
#     url(r'^navigation/', views.navigation, name='navigation'),
#     url(r'^setup/(?P<config_name>\S+)/', views.setup, name='setup'),
#     url(r'^setup/', views.setup, name='setup'),
#     url(r'^speech/(?P<predefined>\S+)/', views.speech, name='speech'),
#     url(r'^speech/', views.speech, name='speech'),
#     url(r'^voice/(?P<predefined>\S+)/', views.voice, name='voice'),
#     url(r'^voice/', views.voice, name='voice'),
#     url(r'^teleop_OP3/(?P<predefined>\S+)/', views.teleop, name='teleop'),
#     url(r'^teleop_OP3/', views.teleop, name='teleop'),
#     url(r'^$', views.index, name='index')
# )

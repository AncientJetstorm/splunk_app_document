from django.conf.urls import patterns, include, url
from splunkdj.utility.views import render_template as render

urlpatterns = patterns('',
    url(r'^home/$', 'testboard.views.home', name='home'), url(r'^trying/$', 'testboard.views.trying', name='trying')
)

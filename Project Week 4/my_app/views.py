from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
def default_greet(request):
    template = loader.get_template('greet.html')
    return HttpResponse(template.render())

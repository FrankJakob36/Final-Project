from django.contrib import admin
from django.urls import path
from my_app.views import default_greet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', default_greet, name='home'),
]

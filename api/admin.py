from django.contrib import admin
from .models import Fact, UserModel

admin.site.register([Fact, UserModel])

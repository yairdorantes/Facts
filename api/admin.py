from django.contrib import admin
from .models import Fact, UserModel, Comment

admin.site.register([Fact, UserModel, Comment])

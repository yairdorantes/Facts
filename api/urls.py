from django.urls import path

from .views import FactsView, UserView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("facts/<int:step>", csrf_exempt(FactsView.as_view()), name="facts"),
    path("user/", csrf_exempt(UserView.as_view()), name="user"),
    path("user/<str:username>", csrf_exempt(UserView.as_view()), name="user"),
]

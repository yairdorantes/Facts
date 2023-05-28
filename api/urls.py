from django.urls import path

from .views import FactsView, UserView, CommentsView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path(
        "facts/<int:from_>/<int:step>", csrf_exempt(FactsView.as_view()), name="facts"
    ),
    path("user/", csrf_exempt(UserView.as_view()), name="user"),
    path("user/<str:username>", csrf_exempt(UserView.as_view()), name="user"),
    path("comms/<int:fact_id>", csrf_exempt(CommentsView.as_view()), name="comments"),
    path(
        "comms/<int:fact_id>/<str:username>",
        csrf_exempt(CommentsView.as_view()),
        name="comments",
    ),
]

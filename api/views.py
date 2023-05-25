import json
from time import sleep
from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import Fact, UserModel

from django.forms.models import model_to_dict


class FactsView(View):
    def get(self, request, step):
        facts = list(Fact.objects.order_by("-id")[:step].values())
        return JsonResponse({"facts": facts})


class UserView(View):
    def get(self, request, username):
        user_data = UserModel.objects.filter(username=username).first()
        user_data = model_to_dict(user_data)
        return JsonResponse({"user": user_data})

    def post(self, request):
        jd = json.loads(request.body)
        user = UserModel.objects.filter(username=jd["username"]).first()
        if user:
            return HttpResponse("oki", 200)
        else:
            UserModel.objects.create(username=jd["username"])
            return HttpResponse("oki", 200)

    def put(self, request, username):
        jd = json.loads(request.body)
        post_id = jd["post_id"]
        reaction = jd["reaction"]
        user_data = UserModel.objects.filter(username=username).first()
        user_data.likes[post_id] = reaction
        user_data.save()
        return HttpResponse("ok", status=200)

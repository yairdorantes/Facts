import json

# from time import sleep
from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import Fact, UserModel, Comment
from django.forms.models import model_to_dict


class FactsView(View):
    def get(self, request, from_, step):
        facts = list(Fact.objects.order_by("-id")[from_ : from_ + step].values())
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
        fact = Fact.objects.filter(id=post_id).first()
        if reaction >= 0:
            fact.total_likes += 1
            fact.save()
        elif reaction == -1:
            fact.total_likes -= 1
            fact.save()
        user_data.likes[post_id] = reaction
        user_data.save()
        print(reaction)
        return HttpResponse("ok", status=200)


class CommentsView(View):
    def get(self, request, fact_id):
        comments = list(
            Comment.objects.filter(fact_p=fact_id).values(
                "description", "user__username"
            )
        )
        return JsonResponse({"comments": comments})

    def post(self, request, fact_id, username):
        jd = json.loads(request.body)
        text = jd["text"]
        user = UserModel.objects.get(username=username)
        Comment.objects.create(user=user, fact_p_id=fact_id, description=text)
        fact = Fact.objects.get(id=fact_id)
        fact.total_comments += 1
        fact.save()
        return HttpResponse("oki", status=200)

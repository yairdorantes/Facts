from django.db import models


# Create your models here.
class Fact(models.Model):
    description = models.CharField(max_length=500, verbose_name="Description")
    total_likes = models.IntegerField(verbose_name="Total likes")
    image = models.TextField(verbose_name="Image")

    def __str__(self):
        return self.description


class UserModel(models.Model):
    username = models.CharField(max_length=50, verbose_name="Name")
    likes = models.JSONField(verbose_name="Likes", default=[{}])

    # password = models.CharField(max_length=50, verbose_name="password")
    def __str__(self) -> str:
        return self.username


class Comment(models.Model):
    description = models.CharField(max_length=500, verbose_name="Comment")


# class Reactions(models.Model):
#     user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
#     fact = models.ForeignKey(Fact, on_delete=models.CASCADE)
#     reaction=models.IntegerField()

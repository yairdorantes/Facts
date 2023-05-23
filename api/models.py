from django.db import models


# Create your models here.
class Fact(models.Model):
    description = models.CharField(max_length=500, verbose_name="Description")
    total_likes = models.IntegerField(verbose_name="Total likes")
    image = models.TextField(verbose_name="Image")


class Comment(models.Model):
    description = models.CharField(max_length=500, verbose_name="Comment")

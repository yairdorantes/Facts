# Generated by Django 4.1.1 on 2023-05-27 17:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0006_alter_usermodel_likes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="fact",
            name="total_likes",
            field=models.IntegerField(default=0, verbose_name="Total likes"),
        ),
    ]

# Generated by Django 2.0.3 on 2018-06-22 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cvs', '0002_auto_20180611_1930'),
    ]

    operations = [
        migrations.AddField(
            model_name='cvs',
            name='cvsNunmber',
            field=models.IntegerField(default=None),
        ),
    ]
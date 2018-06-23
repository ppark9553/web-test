from django.db import models

# Create your models here.

class CVS(models.Model):
    name = models.CharField(max_length=50, blank=True, default='')
    corp_name = models.CharField(max_length=50, blank=True, default='')
    cvsNunmber=models.IntegerField(default=None,max_length=None)
    address = models.CharField(max_length=200, blank=True, default='')
    latitude=models.FloatField()
    longitude= models.FloatField()
    atm = models.BooleanField(default=False)
    chicken = models.BooleanField(default=False)
    fries = models.BooleanField(default=False)
    medicine = models.BooleanField(default=False)
    delivery= models.BooleanField(default=False)
    bakery= models.BooleanField(default=False)
    lotto= models.BooleanField(default=False)
    sportstoto= models.BooleanField(default=False)

    class Meta:
        ordering=('name',)

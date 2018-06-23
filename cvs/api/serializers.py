from rest_framework import serializers

from cvs.models import CVS


class CVSSerializer(serializers.ModelSerializer):
    class Meta:
        model = CVS
        fields = (
            'name',
            'corp_name',
            'cvsNunmber',
            'address',
            'latitude',
            'longitude',
            'atm',
            'chicken',
            'fries',
            'medicine',
            'delivery',
            'bakery',
            'lotto',
            'sportstoto',
        )

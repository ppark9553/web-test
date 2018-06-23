from rest_framework import generics

from cvs.models import CVS
from cvs.api.serializers import CVSSerializer


class CVSAPIView(generics.ListCreateAPIView):
    queryset = CVS.objects.all().order_by('id')
    serializer_class = CVSSerializer

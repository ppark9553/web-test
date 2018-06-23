from django.urls import path, re_path

from cvs.models import CVS
from cvs.api.views import CVSAPIView

urlpatterns = [
    re_path(r'^cvs/$', CVSAPIView.as_view(), name='cvs-api'),
]

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings

from capston.views import (
    CVSView,
    PostDeliveryView,
    PostATMView,
    PostMedicineView,
    PostLottoView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', CVSView.as_view(), name='cvs'),
    re_path(r'^delivery/', PostDeliveryView.as_view(), name='delivery'),
    re_path(r'^atm/', PostATMView.as_view(), name='atm'),
    re_path(r'^medicine/', PostMedicineView.as_view(), name='medicine'),
    re_path(r'^lotto/', PostLottoView.as_view(), name='lotto'),

    # api path
    re_path(r'^api/', include('cvs.api.urls'))
]

from django.shortcuts import render
from django.views import View


class CVSView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'cvs.html', {})

class PostDeliveryView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'postdelivery.html', {})

class PostATMView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'postatm.html', {})

class PostMedicineView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'postmedicine.html', {})

class PostLottoView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'postlotto.html', {})

from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='/login/')
def paster(request):
    return render(request, 'paster/paster.html')
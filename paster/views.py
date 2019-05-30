from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PasteText

@login_required(login_url='/login/')
def paster(request):
    entries = PasteText.objects.order_by('-created')
    return render(request, 'paster/paster.html', {'entries' : entries})

@csrf_exempt
def post_text(request):
    text = request.POST.get('to_save', None)
    created = PasteText.objects.create(text=text)
    data = {
        'saved_text': created.text,
        'saved_id' : created.id
    }
    return JsonResponse(data)

@csrf_exempt
def delete_text(request):
    id = request.POST.get('to_delete', None)
    ret = PasteText.objects.get(id=id).delete()
    if ret[0] == 1:
        data = {'was_success': "true"}
    else:
        data = {'was_success': "false"}
    return JsonResponse(data)
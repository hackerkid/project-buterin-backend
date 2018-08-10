from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files import File

import os

module_dir = os.path.dirname(__file__)
uploads_dir = os.path.join(module_dir, "uploads")

def handle_uploaded_file(f, file_name):

    if not os.path.exists(os.path.dirname(file_name)):
        try:
            os.makedirs(os.path.dirname(file_name))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise

    with open(file_name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

@csrf_exempt
def submit_code(request: HttpRequest):
    question_id = request.POST["question_id"]
    participant_id = request.POST["participant_id"]
    file_name = os.path.join(uploads_dir, question_id, participant_id + ".sol")
    handle_uploaded_file(request.FILES['code'], file_name)
    return HttpResponse("done")

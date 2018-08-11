from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files import File

from subprocess import call

import os

module_dir = os.path.dirname(__file__)
uploads_dir = os.path.join("uploads")
testcase_dir = os.path.join("testcases")

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
    question_id = request.POST["contractAddreess"]
    participant_id = request.POST["userAddress"]
    username = request.POST["username"]

    os.environ["question_id"] = question_id
    os.environ["participant_id"] = participant_id

    solution_file = os.path.join(uploads_dir, question_id, participant_id + ".sol")
    gas_used_file = os.path.join(uploads_dir, question_id, participant_id + ".gas")
    
    testcase_file = os.path.join(testcase_dir, question_id + ".js")

    handle_uploaded_file(request.FILES['solutionFile'], solution_file)
    call(["node_modules/mocha/bin/mocha", testcase_file])
    call(["node project-butarin-new/ethereum/add-solution.js"])

    with open(gas_used_file, "r") as f:
        return HttpResponse(f.read())

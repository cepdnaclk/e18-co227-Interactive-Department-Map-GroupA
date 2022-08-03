import json
import os

def validateJsonFile(jsonFile):
    try:
        json.load(jsonFile)
    except ValueError as err:
        print(err)
        return False
    return True

path_to_json = 'json/'

json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]
for index, js in enumerate(json_files):
    with open(os.path.join(path_to_json, js)) as json_file:
        if(validateJsonFile(json_file)==True):
            print("Given JSON file "+json_files[index]+" is valid")
            print("------------------------------------")
        else:
            print("Given JSON file "+json_files[index]+" is not valid")
            print("------------------------------------")

import json
import pymysql

GET_RAW_PATH = "/verification"


def make_response():
    http_response = {}
    http_response['statusCode'] = 200
    http_response['headers'] = {}
    http_response['headers']['Content-Type'] = 'application/json'
    return http_response


def lambda_handler(event, context):
    connection = pymysql.connect(
        host='store.cplwlfruagai.us-east-2.rds.amazonaws.com',
        user='admin',
        password='CS611DB!',
        database='store',
        cursorclass=pymysql.cursors.DictCursor)
    cur = connection.cursor()
    if event['rawPath'] == GET_RAW_PATH:
        # POST Request
        print("Start request for verification")
        # Make json body -> dict
        decodedEvent = json.loads(event["body"])

        email = decodedEvent["email"]
        password = decodedEvent["password"]

        print(email)
        print(password)

        # Getting item from DB
        # cur.execute("SELECT * FROM users WHERE email= + email")
        # print("SELECT * FROM users WHERE email= + email")
        # db_output = cur.fetchall()
        # print(db_output)

        cur.execute("SELECT * FROM users WHERE email=\"" + email + "\"")
        print("SELECT * FROM users WHERE email=\"" + email + "\"")
        db_output = cur.fetchone()
        print(db_output)

        registered_password = db_output["password"]
        print(registered_password)

        passwords_match = (registered_password == password)
        print(passwords_match)

        print("Completed verification request")

        # Creating response
        http_response = make_response()
        http_response['body'] = {"verified": passwords_match}
        response = json.dumps(http_response, indent=4)
        return response
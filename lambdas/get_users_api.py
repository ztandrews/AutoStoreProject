import json
import pymysql

GET_ALL_RAW_PATH = "/getUsers"
GET_RAW_PATH = "/getUser"
CREATE_RAW_PATH = "/createUser"
DELETE_RAW_PATH = "/deleteUser"


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

    if event['rawPath'] == GET_ALL_RAW_PATH:
        # Get Request
        print("Start request for " + event['rawPath'])

        # Getting item from DB
        cur.execute("select * from users")
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == GET_RAW_PATH:
        # Get Request
        print("Start request for " + event['rawPath'])

        # Grabbing passed parameter
        userID = event["queryStringParameters"]["userID"]

        print("Recieved request with userID: " + userID)

        # Getting item from DB
        cur.execute("select * from users where user_id=" + userID)
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == CREATE_RAW_PATH:
        # POST Request
        print("Start request for " + event['rawPath'])
        # Make json body -> dict
        decodedEvent = json.loads(event["body"])

        # Assign variables (would making an object be better?)
        # Randomly assigning a user id... might change this
        # uid = str(uuid.uuid1())

        uid = decodedEvent["uid"]
        username = decodedEvent["username"]
        email = decodedEvent["email"]
        first_name = decodedEvent["first_name"]
        last_name = decodedEvent["last_name"]
        password = decodedEvent["password"]

        # Getting item from DB
        cur.execute(
            "INSERT INTO users (username, email, first_name, last_name, password) VALUES ('" + username + "', '" + email + "', '" + first_name + "', '" + last_name + "', '" + password + "')")
        connection.commit()

        # This returns nothing...
        db_output = cur.fetchone()

        print("Completed createUser request")

        # Creating response
        # TODO: add something to body
        http_response = make_response()
        # http_response['body'] = json.dumps(db_output)
        http_response['body'] = {"user_id": uid, "username": username, "email": email, "first_name": first_name,
                                 "last_name": last_name}
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == DELETE_RAW_PATH:
        # Get Request
        print("Start request for deleteUser")

        # Grabbing passed parameter
        userID = event["queryStringParameters"]["userID"]

        print("Recieved request with userID: " + userID)

        # Getting item from DB
        cur.execute("DELETE FROM users WHERE user_id=" + userID)
        print("User " + userID + " has been deleted")
        connection.commit()

        # Creating response
        http_response = make_response()
        http_response['body'] = {"user_id": userID}
        response = json.dumps(http_response, indent=4)
        return response

    else:
        # This part doesn't work right. Might not be needed
        http_response = make_response()
        http_response['body'] = {"ERROR: No usable endpoint found"}
        response = json.dumps(http_response, indent=4)
        return response

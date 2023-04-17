import json
import pymysql

GET_ALL_RAW_PATH = "/getVehicles"
GET_RAW_PATH = "/getVehicle"
CREATE_RAW_PATH = "/createVehicle"
DELETE_RAW_PATH = "/deleteVehicle"


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

    print(event['rawPath'])
    if event['rawPath'] == GET_ALL_RAW_PATH:
        # Get Request
        print("Start request for getVehicles")

        # Getting item from DB
        cur.execute("SELECT * FROM veichles WHERE is_purchased = 0")
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == GET_RAW_PATH:
        # Get Request
        print("Start request for getVehicle")

        # Grabbing passed parameter
        vehicle_id = event["queryStringParameters"]["vehicle_id"]

        print("Recieved request with vehicle_id: " + vehicle_id)

        # Getting item from DB
        cur.execute("select * from veichles where veichle_id=" + vehicle_id)
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == CREATE_RAW_PATH:
        # POST Request
        print("Start request for createVehicle")
        # Make json body -> dict
        decodedEvent = json.loads(event["body"])

        # Assign variables (would making an object be better?)
        # Randomly assigning a user id... might change this
        # uid = str(uuid.uuid1())

        vehicle_id = decodedEvent["vehicle_id"]
        vehicle_price = decodedEvent["vehicle_price"]
        vehicle_description = decodedEvent["vehicle_description"]
        vehicle_stripe_id = decodedEvent["vehicle_stripe_id"]
        vehicle_year = decodedEvent["vehicle_year"]
        vehicle_type = decodedEvent["vehicle_type"]
        vehicle_name = decodedEvent["vehicle_name"]
        is_purchased = decodedEvent["is_purchased"]

        # Getting item from DB
        cur.execute("INSERT INTO veichles (veichle_id, veichle_price, veichle_description, veichle_stripe_id, veichle_year, veichle_type, veichle_name, is_purchased) VALUES (" + vehicle_id + ", '" + vehicle_price + "', '" + vehicle_description + "', '" + vehicle_stripe_id + "', '" + vehicle_year + "', '" + vehicle_type + "', '" + vehicle_name + "', '" + str(is_purchased) + "')")
        connection.commit()

        print("Completed createVehicle request")

        # Creating response
        # TODO: add something to body
        http_response = make_response()
        http_response['body'] = {"vehicle_id": vehicle_id, "vehicle_price": vehicle_price, "vehicle_description": vehicle_description, "vehicle_stripe_id": vehicle_stripe_id, "vehicle_year": vehicle_year, "vehicle_type": vehicle_type, "vehicle_name": vehicle_name, "is_purchased": is_purchased}
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == DELETE_RAW_PATH:
        # Get Request
        print("Start request for deleteVehicle")

        # Grabbing passed parameter
        vehicle_id = event["queryStringParameters"]["vehicle_id"]

        print("Recieved request with vehicle_id: " + vehicle_id)

        # Getting item from DB
        cur.execute("delete from veichles where veichle_id=" + vehicle_id)
        connection.commit()

        # Creating response
        http_response = make_response()
        http_response['body'] = {"vehicle_id":vehicle_id}
        response = json.dumps(http_response, indent=4)
        return response

    else:
        # This part doesn't work right. Might not be needed
        http_response = make_response()
        http_response['body'] = {"ERROR: No usable endpoint found"}
        response = json.dumps(http_response, indent=4)
        return response

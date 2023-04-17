import json
import pymysql

GET_ALL_RAW_PATH = "/getPurchases"
GET_RAW_PATH = "/getPurchase"
CREATE_RAW_PATH = "/createPurchase"
DELETE_RAW_PATH = "/deletePurchase"


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
        print("Start request for getPurchases")

        # Getting item from DB
        cur.execute("select * from purchases")
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == GET_RAW_PATH:
        # Get Request
        print("Start request for getPurchase")

        # Grabbing passed parameter
        purchase_id = event["queryStringParameters"]["purchase_id"]

        print("Recieved request with purchase_id: " + purchase_id)

        # Getting item from DB
        cur.execute("SELECT * FROM purchases WHERE purchase_id=" + purchase_id)
        db_output = cur.fetchall()

        # Creating response
        http_response = make_response()
        http_response['body'] = json.dumps(db_output)
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == CREATE_RAW_PATH:
        # POST Request
        print("Start request for createPurchase")
        # Make json body -> dict
        decodedEvent = json.loads(event["body"])

        # Assign variables (would making an object be better?)
        # Randomly assigning a user id... might change this
        # uid = str(uuid.uuid1())

        purchase_id = decodedEvent["purchase_id"]
        veichle_id_fk = decodedEvent["veichle_id_fk"]
        user_id_fk = decodedEvent["user_id_fk"]
        purchase_date = decodedEvent["purchase_date"]

        print(purchase_date)
        # Getting item from DB
        cur.execute(
            "INSERT INTO purchases (purchase_id, veichle_id_fk, user_id_fk, purchase_date) VALUES (" + str(purchase_id) + ", '" + str(veichle_id_fk) + "', '" + str(user_id_fk) + "', '" + str(purchase_date) + "')")
        connection.commit()

        print("Completed createPurchase request")

        # Creating response
        # TODO: add something to body
        http_response = make_response()
        http_response['body'] = {"purchase_id": purchase_id, "veichle_id_fk": veichle_id_fk, "user_id_fk": user_id_fk, "purchase_date": purchase_date}
        response = json.dumps(http_response, indent=4)
        return response

    elif event['rawPath'] == DELETE_RAW_PATH:
        # Get Request
        print("Start request for deletePurchase")

        # Grabbing passed parameter
        purchase_id = event["queryStringParameters"]["purchase_id"]

        print("Recieved request with purchase_id: " + purchase_id)

        # Getting item from DB
        cur.execute("DELETE FROM purchases WHERE purchase_id=" + purchase_id)
        connection.commit()

        print("Completed deletePurchase request")

        # Creating response
        http_response = make_response()
        http_response['body'] = {"purchase_id":purchase_id}
        response = json.dumps(http_response, indent=4)
        return response

    else:
        # This part doesn't work right. Might not be needed
        http_response = make_response()
        http_response['body'] = {"ERROR: No usable endpoint found"}
        response = json.dumps(http_response, indent=4)
        return response

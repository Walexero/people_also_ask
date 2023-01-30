# Flask
from flask import Flask, request, render_template, jsonify
from gevent.pywsgi import WSGIServer
import people_also_ask



# Declare a flask app
application = Flask(__name__)

print('Model loaded. Check http://127.0.0.1:5000/')


@application.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@application.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        print("python_code")
        inputSearch = request.json['inputSearch']
        inputDepth = request.json['inputDepth']

        if inputDepth == "1":
            result = people_also_ask.get_related_questions(inputSearch, 2)
            dictionary = {k: v for k, v in enumerate(result)}
            return jsonify(result=dictionary)
        elif inputDepth == "2":
            result = []
            result1 = people_also_ask.get_related_questions(inputSearch, 2)
            for i in range(len(result1)):
                result2 = people_also_ask.get_related_questions(result1[i], 2)
                result.append(result2)
            dictionary = dict(zip(result1, result))
            return jsonify(result=dictionary)
        else:
            result_depth1 = []
            result_depth2 = []
            result1 = people_also_ask.get_related_questions(inputSearch, 2)
            for i in range(len(result1)):
                if len(result1[i]) != 0:
                    result2 = people_also_ask.get_related_questions(result1[i], 2)
                else:
                    result2 = [" ", " ", " "]
                result_depth1.append(result2)
                for j in range(len(result2)):
                    if result2[j] != " ":
                        result3 = people_also_ask.get_related_questions(result2[j], 2)
                    else:
                        result3 = [" ", " ", " "]
                    result_depth2.append(result3)

            dictionary = dict(zip(result1, result_depth1))
            final_dict = {
                "first" : dictionary,
                "second" : result_depth2
            }
            print(final_dict)
            return jsonify(result=final_dict)
            

        

    return None


if __name__ == '__main__':
    # app.run(port=5002, threaded=False)

    # Serve the app with gevent
    http_server = WSGIServer(('0.0.0.0', 5000), application)
    http_server.serve_forever()

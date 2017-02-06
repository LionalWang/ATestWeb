from flask import Flask, jsonify
from flask import render_template
from flask import request
from a_visit import multi_visit

app = Flask(__name__)


@app.route('/')
def begin():
    return render_template('test_time.html')


@app.route('/test_speed')
def test_speed():
    url = request.args.get('url')
    times = request.args.get('times', 1, type=int)
    result = multi_visit(url, times)
    return jsonify({'total': result['total'],
                    'success': result['success'],
                    'fail': result['fail'],
                    'exception': result['exception'],
                    'average_time': result['average_time'],
                    'max_time': result['max_time'],
                    'min_time': result['min_time'],
                    })


if __name__ == '__main__':
    app.run(debug=True)

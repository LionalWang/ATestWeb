from flask import Flask
from flask import render_template
from flask import request
from a_visit import multi_visit

app = Flask(__name__)


@app.route('/test', methods=['GET', 'POST'])
def test_speed():
    display = False
    if request.method == 'POST':
        url = request.form['url']
        times = int(request.form['times'])
        print 'URL is %s' % url
        display = True
        result = multi_visit(url, times)

        print 'URL is %s' % result['url']
        print 'Total is %s' % result['total']
        print 'Success is %s' % result['success']
        print 'Fail is %s' % result['fail']
        print 'Exception is %s' % result['exception']
        print 'Average time is %s' % result['average_time']
        print 'Max time is %s' % result['max_time']
        print 'Min time is %s' % result['min_time']

        return render_template('test_time.html', display=display, result=result)

    return render_template('test_time.html', display=display)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

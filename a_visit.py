import time
import urllib2
import json


def visit(url):
    try:
        st = time.time()
        response = urllib2.urlopen(url, data=None, timeout=30)
        time_span = time.time() - st
        api_content = response.read()
        json_object = json.loads(api_content)
    except Exception, e:
        print e
        status = 0
        result = {'status': status, 'exception': e}
    else:
        if json_object.get('status', {}) == 200:
            status = 1
        else:
            status = 2
        result = {'status': status, 'time': time_span}
    return result


def multi_visit(url, times):
    total = 0
    success = 0
    fail = 0
    exception = 0
    total_time = 0
    max_time = 0
    min_time = 2

    for i in range(times):
        get_result = visit(url)

        if get_result.get('status', {}) == 1:
            total += 1
            success += 1
            this_time = get_result.get('time')

            if this_time > max_time:
                max_time = this_time
            if this_time < min_time:
                min_time = this_time
            total_time += this_time

        elif get_result.get('status', {}) == 0:
            total += 1
            exception += 1

        elif get_result.get('status', {}) == 2:
            total += 1
            fail += 1

    if success == 0:
        final_result = {'total': total, 'success': 0, 'fail': fail,
                        'exception': exception, 'average_time': 0,
                        'max_time': max_time, 'min_time': 0, 'url': url}
        return final_result
    else:
        final_result = {'total': total, 'success': success, 'fail': fail,
                        'exception': exception, 'average_time': total_time / success,
                        'max_time': max_time, 'min_time': min_time, 'url': url}
        return final_result


def visit_for_result(url):
    try:
        response = urllib2.urlopen(url, data=None, timeout=30)
        api_content = response.read()
        # json_object = json.loads(api_content)
    except Exception, e:
        print e
        status = 0
        result = {'status': status, 'exception': e}
    else:
        result = api_content
    return result

$(document).ready(function () {
    $("#submit_button").bind('click', function(){

        if(!$("#input_url").val().length||!$("#input_times").val().length){
            alert("缺少内容");
            return false;
        }

        $.getJSON($SCRIPT_ROOT + '/test_speed',
            {
                url:$("#input_url").val(),
                times:$("#input_times").val(),
                now: new Date().getTime()
            },function (data) {
                $("#result_url").text($("#input_url").val());
                $("#result_total").text(data.total);
                $("#result_success").text(data.success);
                $("#result_fail").text(data.fail);
                $("#result_exception").text(data.exception);
                $("#result_average_time").text(data.average_time);
                $("#result_max_time").text(data.max_time);
                $("#result_min_time").text(data.min_time)
            })
    });
});


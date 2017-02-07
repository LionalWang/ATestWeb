$(document).ready(function () {
    $("#button_add").bind('click', function () {
        $("#title_key").append("<input class='key' type='text' size='20'>");
        $("#title_value").append("<input class='value' type='text' size='20'>")
    });

    $("#button_remove").bind('click', function () {
        $("input.key:last").remove();
        $("input.value:last").remove();
    });

    $("#button_send").bind('click', function () {
        var keyArray = [];
        var valueArray = [];

        if(!$("#input_url").val().length){
            alert("缺少内容");
            return false;
        }

        $("input.key").each(function () {
            if(!$(this).val().length){
                alert("缺少内容");
                return false;
            }
            keyArray.push($(this).val());
        });
        $("input.value").each(function () {
            if(!$(this).val().length){
                alert("缺少内容");
                return false;
            }
            valueArray.push($(this).val())
        });

        var url = $("#input_url").val()+"?";

        for (var i=0; i<keyArray.length; i++) {
            url = url +"&" + keyArray[i] + "=" + valueArray[i]
        }

        $.getJSON($SCRIPT_ROOT + '/test_parameter', {
            url: url,
            now: new Date().getTime()
        }, function (data) {
            $("#result").text(data.result);
            console.log(formatJson(data.result))
        })
    });
});

var formatJson = function(json, options) {
	var reg = null,
		formatted = '',
		pad = 0,
		PADDING = '    '; // one can also use '\t' or a different number of spaces

	// optional settings
	options = options || {};
	// remove newline where '{' or '[' follows ':'
	options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
	// use a space after a colon
	options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

	// begin formatting...
	if (typeof json !== 'string') {
		// make sure we start with the JSON as a string
		json = JSON.stringify(json);
	} else {
		// is already a string, so parse and re-stringify in order to remove extra whitespace
		json = JSON.parse(json);
		json = JSON.stringify(json);
	}

	// add newline before and after curly braces
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline before and after square brackets
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');

	// add newline after comma
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');

	// remove multiple newlines
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');

	// remove newlines before commas
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');

	// optional formatting...
	if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
		reg = /\:\r\n\{/g;
		json = json.replace(reg, ':{');
		reg = /\:\r\n\[/g;
		json = json.replace(reg, ':[');
	}
	if (options.spaceAfterColon) {
		reg = /\:/g;
		json = json.replace(reg, ':');
	}

	$.each(json.split('\r\n'), function(index, node) {
		var i = 0,
			indent = 0,
			padding = '';

		if (node.match(/\{$/) || node.match(/\[$/)) {
			indent = 1;
		} else if (node.match(/\}/) || node.match(/\]/)) {
			if (pad !== 0) {
				pad -= 1;
			}
		} else {
			indent = 0;
		}

		for (i = 0; i < pad; i++) {
			padding += PADDING;
		}

		formatted += padding + node + '\r\n';
		pad += indent;
	});

	return formatted;
};
function load_by_url(id, url) {
    $.get(url, function (data) {
        $("div#" + id).html(data);
    });
}
function submit_form(id, success) {
    $("form#" + id).submit(function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        var url = $(this).attr("action");
        $.ajax(
            {
                url: url,
                type: "POST",
                data: data,
                success: function (data, textStatus, jqXHR) {
                    if (data.message) {
                        alert(data.message);
                    }
                    if (success) {
                        success(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            }
        );

    });
}
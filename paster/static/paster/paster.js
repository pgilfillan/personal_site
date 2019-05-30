var clipboard = new ClipboardJS(".clipboard");

function onDeleteClick($button) {
    var parentDiv = $button.parent().parent();
    $.ajax({
        type: "POST",
        url: /delete_text/,
        data: {
            'to_delete': parentDiv.attr('id')
        },
        dataType: 'json',
        success: function (data) {
            if (data.was_success == "true") {
                parentDiv.fadeOut("normal", function() {
                    $(this).remove();
                });
            } else {
                alert("Delete failed");
            }
        }
    });
}

$(".deleteButton").click(function() {
    onDeleteClick($(this))
});

$("#saveButton").click(function() {
    var text = $("#saveText").val();
    if (text == "") {
        return;
    }

    $.ajax({
        type: "POST",
        url: /post_text/,
        data: {
            'to_save': text
        },
        dataType: 'json',
        success: function (data) {
            text = data.saved_text;
            var id = data.saved_id;
            var newHTML = `
             <div class="input-group mb-3" id="${id}">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary clipboard" type="button" data-clipboard-target="#pastedtext${id}">Copy</button>
              </div>
              <input type="text" class="form-control" value="${text}" aria-label="" aria-describedby="basic-addon1" id="pastedtext${id}" readonly>
              <div class="input-group-append">
                <button class="btn btn-outline-danger deleteButton" type="button">Delete</button>
              </div>
            </div>
            `;
            $(newHTML).hide().prependTo("#entriesContainer").fadeIn("slow");
            $("#saveText").val("");
            $(".deleteButton").click(function() {
                onDeleteClick($(this))
            });
        }
    });
});

$("#saveText").keypress(function(e) {
    if (e.keyCode==13) {
        $('#saveButton').click();
    }
});
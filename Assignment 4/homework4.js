$(document).ready(function() {
    actorsList();
});

function actorsList() {
    $.ajax({
        url: 'http://localhost:3000/actors',
        type: "GET",
        dataType: 'json',
        success: function(data) {
            $.each(data, function(x, value) {
                //console.log(data);
                $(".demo-list-action").addClass("mdl-list");
                $(".demo-list-action").append(loadActorData(value));

            });
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Error" + xhr + textStatus + errorThrown);
        }
    });
}

$(".addActorButton").click(function() {

    var name = $(".newActorName").val();

    $.ajax({
        url: 'http://localhost:3000/actors',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            starred: false
        }),
        dataType: 'json',
        success: function(data) {
            //alert(data.name);
            $(".demo-list-action").append(loadActorData(data));
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Error" + xhr + textStatus + errorThrown);
        }
    });

});

$(".demo-list-action").on("click", "a i", function() {

    var rowId = $(this).attr("id");
    var currentStarVal = $(this).text();
    var name = $(this).parent().prev().find('span:first').text();

    var flag = false;

    console.log($(this));

    if (currentStarVal === "star") {
        flag = false;
        $(this).text("star_border");

    } else {
        flag = true;
        $(this).text("star");

    }

    $.ajax({
        url: 'http://localhost:3000/actors/' + rowId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            starred: flag
        }),
        dataType: 'json'
    });

});

function loadActorData(jsonData) {
    var content = "";
    content += "<div class=\"mdl-list__item\">";
    content += "<span class=\"mdl-list__item-primary-content\">";
    content += "<i class=\"material-icons mdl-list__item-avatar\">person</i>";

    content += "<span>" + jsonData.name + "</span>";
    content += "</span>";
    content += "<a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons star\" id=" + jsonData.id + ">";

    if (jsonData.starred) {
        content += "star";
    } else {
        content += "star_border";
    }
    content += "</i></a>";
    content += "</div>";
    return content;
}
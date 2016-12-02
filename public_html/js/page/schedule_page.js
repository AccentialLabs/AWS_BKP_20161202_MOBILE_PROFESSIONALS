todayDate = new Date();
referenceDate = new Date();

$(document).ready(function () {

        document.getElementById("userName").innerHTML = $.cookieStorage.get('SecondaryUser').name+"<br><small style=\'font-size:3vw;\'>"+$.cookieStorage.get('companies').fancy_name+"</small>";

    $('#profissionalSchedule').on('click', '.col-xs-12', function () {
        $("#scheduleHourId").html($(this).html());
        $("#scheduleDayChoose").val($(this).attr('date'));
        $('#myModal').modal('show');
    });

    $("#dangerButtonSchedule").click(function () {
        $('#myModal').modal('hide');
    });

    $("#successButtonSchedule").click(function () {
        setScheduleForUser();
    });

    $("#myModal").on("click", "#closeButtonSchedule", function () {
        window.location.href = "home.html";
    });

    $("#historyBackPage").click(function () {
        $.sessionStorage.remove('professional_id');
        window.history.back();
    });

    $("#goToNextMonth").click(function () {
        referenceDate.setMonth(referenceDate.getMonth() + 1);
        referenceDate.setDate(referenceDate.getDate() - 3);
        populateSchedulePage(referenceDate);
    });

    $("#goToBackMonth").click(function () {
        referenceDate.setMonth(referenceDate.getMonth() - 1);
        referenceDate.setDate(referenceDate.getDate() - 3);
        if (referenceDate < todayDate) {
            referenceDate = new Date();
        }
        populateSchedulePage(referenceDate);
    });

    $("#weekCol4").click(function () {
        referenceDate.setDate(referenceDate.getDate() + 1);
        populateSchedulePage(referenceDate);
    });

    $("#weekCol1").click(function () {
        referenceDate.setDate(referenceDate.getDate() - 7);
        if (referenceDate < todayDate) {
            referenceDate = new Date();
        }
        populateSchedulePage(referenceDate);
    });

    populateSchedulePage(referenceDate);
});

function populateSchedulePage(scheduleBase) {
    var monthNames = ["JANEIRO", "FEVEREIRO", "MARCO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    var weekNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    if (scheduleBase === undefined) {
        scheduleBase = new Date();
    }

    $("#monthAndYear").html(monthNames[scheduleBase.getMonth()] + " " + scheduleBase.getFullYear());

    var referenceDayHtml = weekNames[scheduleBase.getDay()] + '<span class="DayMonthYear">' + ("0" + scheduleBase.getDate()).slice(-2) + '/' + (("0" + (scheduleBase.getMonth() + 1)).slice(-2)) + '/' + scheduleBase.getFullYear() + '</span>';
    $("#weekCol1").html(referenceDayHtml);
    getScheduleFromUser('scheduleCol1', scheduleBase);

    scheduleBase.setDate(scheduleBase.getDate() + 1);
    referenceDayHtml = weekNames[scheduleBase.getDay()] + '<span class="DayMonthYear">' + ("0" + scheduleBase.getDate()).slice(-2) + '/' + (("0" + (scheduleBase.getMonth() + 1)).slice(-2)) + '/' + scheduleBase.getFullYear() + '</span>';
    $("#weekCol2").html(referenceDayHtml);
    getScheduleFromUser('scheduleCol2', scheduleBase);

    scheduleBase.setDate(scheduleBase.getDate() + 1);
    referenceDayHtml = weekNames[scheduleBase.getDay()] + '<span class="DayMonthYear">' + ("0" + scheduleBase.getDate()).slice(-2) + '/' + (("0" + (scheduleBase.getMonth() + 1)).slice(-2)) + '/' + scheduleBase.getFullYear() + '</span>';
    $("#weekCol3").html(referenceDayHtml);
    getScheduleFromUser('scheduleCol3', scheduleBase);

    scheduleBase.setDate(scheduleBase.getDate() + 1);
    referenceDayHtml = weekNames[scheduleBase.getDay()] + '<span class="DayMonthYear">' + ("0" + scheduleBase.getDate()).slice(-2) + '/' + (("0" + (scheduleBase.getMonth() + 1)).slice(-2)) + '/' + scheduleBase.getFullYear() + '</span>';
    $("#weekCol4").html(referenceDayHtml);
    getScheduleFromUser('scheduleCol4', scheduleBase);

}

function getScheduleFromUser(htmlId, scheduleDate) {
    var obejctSend = {
        subclass_id: $.sessionStorage.get('subclass_id'),
        bussiness_id: $.sessionStorage.get('bussiness_id'),
        professional_id: $.sessionStorage.get('professional_id'),
        schedule_date: scheduleDate};
    var thisDayDate = scheduleDate.getFullYear() + "-" + (("0" + (scheduleDate.getMonth() + 1)).slice(-2)) + "-" + ("0" + scheduleDate.getDate()).slice(-2);
    sendRequest(obejctSend, "schedule", "get").done(function (result) {
        var objReturn = JSON.parse(result);
        if (objReturn.cod === 0) {
            var html = '';
            jQuery.each(objReturn.msg, function (index, value) {
                html = html
                        + '<div class="row">'
                        + '    <div class="col-xs-12" date="' + thisDayDate + '">'
                        + '        ' + value.substr(0, 5)
                        + '    </div>'
                        + '</div>';
            });
            $("#" + htmlId).html(html);
        } else {
            generateModalAlert(objReturn.msg);
            $('#mymodal').modal('show');
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
    });

}

function setScheduleForUser() {
    var obejctSend = {
        user_id: $.cookieStorage.get('SecondaryUser').id,
        user_name: $.cookieStorage.get('SecondaryUser').name,
        user_phone: $.cookieStorage.get('SecondaryUser').phone,
        subclass_id: $.sessionStorage.get('subclass_id'),
        bussiness_id: $.sessionStorage.get('bussiness_id'),
        professional_id: $.sessionStorage.get('professional_id'),
        service_id: $.sessionStorage.get('service_id'),
        schedule_date: $("#scheduleDayChoose").val(),
        schedule_hour: $.trim($("#scheduleHourId").html())};
    sendRequest(obejctSend, "schedule", "set").done(function (result) {
        var objReturn = JSON.parse(result);
        console.log(objReturn);
        if (objReturn.cod === 0) {
            var message = '<div class="alert alert-success" role="alert">Agendamento salvo com successo!</div>';
            $("#dangerButtonSchedule").hide();
            $("#successButtonSchedule").hide();
            $("#closeButtonSchedule").show();
            $(".saveOkClass").html(message);
            $(".saveOkClass").show();
        } else {
            if (objReturn.cod === 2) {
                var message = '<div class="alert alert-danger" role="alert">Não foi possivel realizar o agendamento!</div>';
                $(".saveOkClass").html(message);
                $(".saveOkClass").show();
            } else {
                generateModalAlert(objReturn.msg);
                $('#mymodal').modal('show');
            }
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}
var postcodes = [];
var cinemas = [];
var isMore = false;

$('#btn-more-show').click(function() {
    var val = $('#btn-more-show').next();
    var status = val.val();
    if (status == 'hide') {
        $('.more-show').show()
        $(this).text('Hide other branches');
        val.val('show');
        isMore = true;
    } else {
        $('.more-show').hide();
        $(this).text('Show more branches');
        val.val('hide');
        isMore = false;
    }
    MapView();
});


$('#btn-search-again').click(function() {
    var val = $('#btn-more-show').next();
    $('#postcode').val("");
    $('#btn-more-show').text('Show more branches');
    val.val('hide');
    $('.map-view').hide();
    $('.more-show').hide();
    $('.search-form').show();
    isMore = false;
});

$('#btn-search').click(function() {
    $('.alert-danger').hide();
    var postcode = $('#postcode').val();
    if (postcode.trim() == "") {
        $('.alert-danger').show();
        return;
    }
    $.ajax({
        url: 'controller/Cinema.php',
        type: 'POST',
        data: {
            postcode: postcode
        },
        success: function(res) {
            var result = JSON.parse(res);
            if (result['status'] != 'OK') {
                $('.alert-danger').show();
                return;
            } else {
                postcodes = [];
                data_process(result['data']);
                $('.map-view').show();
                $('.search-form').hide();
                MapView();
            }
        }
    });
});

function initSeatShow() {
    $('.cinema-item').click(function() {
        var id = $(this).data('id');
        var seat = $('#seat-' + id);
        var isShow = seat.children('input').val();
        if (isShow == 1) {
            console.log('no show');
            seat.hide();
            seat.children('input').val('0');
        } else {
            console.log('show');
            seat.show();
            seat.children('input').val('1');
        }

    });
}

function data_process(data) {
    cinemas = data;
    data.forEach(item => {
        postcodes.push(item.postcode);
    });

    var html = "";
    for (let i = 0; i < 5; i++) {
        var cinema = data[i];
        var seat_details = cinema.seat_details;
        var html_seat = "";
        seat_details.forEach(seat => {
            html_seat += `<div class="seat-item">
                            <div class="row seat-info"><div class="col-4">ID:</div> <div class="col-8">${seat.id} </div></div>
                            <div class="row seat-info"><div class="col-4">Location Name: </div> <div class="col-8">${seat.location_name}</div></div>
                            <div class="row seat-info"><div class="col-4">Seat: </div> <div class="col-8">${seat.seat}</div></div>
                            <div class="row seat-info"><div class="col-4">Unique Time: </div> <div class="col-8">${seat.unique_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Scr Time: </div> <div class="col-8">${seat.scr_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Closing Time: </div> <div class="col-8">${seat.closing_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Waiting Close: </div> <div class="col-8">${seat.waiting_close}</div></div>
                        </div>`;
        });
        html += `<div class="result-item">
                    <div class="row">
                        <div class="col-2 item-num">${i+1}</div>
                        <div class="col-10">
                            <div class="cinema-item" data-id="${i+1}">
                                <div class="row item-name">${cinema.cinema}</div>
                                <div class="row item-address">${cinema.address1 + ", " + cinema.address2}</div>
                                <div class="row item-postcode">${cinema.postcode}</div>
                                <div class="row item-distance">${ cinema.distance.toFixed(2)}km</div>
                            </div>
                            <div id="seat-${i+1}" data-show="false" class="seat-details">
                                <input type="hidden" value=0>
                                ${html_seat}
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    $('.default-show').html(html);
    html = "";
    for (let i = 5; i < data.length; i++) {
        var cinema = data[i];
        var seat_details = cinema.seat_details;
        var html_seat = "";
        seat_details.forEach(seat => {
            html_seat += `<div class="seat-item">
                            <div class="row seat-info"><div class="col-4">ID:</div> <div class="col-8">${seat.id} </div></div>
                            <div class="row seat-info"><div class="col-4">Location Name: </div> <div class="col-8">${seat.location_name}</div></div>
                            <div class="row seat-info"><div class="col-4">Seat: </div> <div class="col-8">${seat.seat}</div></div>
                            <div class="row seat-info"><div class="col-4">Unique Time: </div> <div class="col-8">${seat.unique_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Scr Time: </div> <div class="col-8">${seat.scr_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Closing Time: </div> <div class="col-8">${seat.closing_time}</div></div>
                            <div class="row seat-info"><div class="col-4">Waiting Close: </div> <div class="col-8">${seat.waiting_close}</div></div>
                        </div>`;
        });
        html += `<div class="result-item">
                    <div class="row">
                        <div class="col-2 item-num">${i+1}</div>
                        <div class="col-10">
                            <div class="cinema-item" data-id="${i+1}">
                                <div class="row item-name">${cinema.cinema}</div>
                                <div class="row item-address">${cinema.address1 + ", " + cinema.address2}</div>
                                <div class="row item-postcode">${cinema.postcode}</div>
                                <div class="row item-distance">${ cinema.distance.toFixed(2)}km</div>
                            </div>
                            <div id="seat-${i+1}" data-show="false" class="seat-details">
                                <input type="hidden" value=0>
                                ${html_seat}
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    $('.more-show').html(html);
    initSeatShow();

}
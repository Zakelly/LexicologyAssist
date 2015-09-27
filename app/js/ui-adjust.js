/**
 * Created by ZQLan on 15/9/27.
 */

$(window).resize(function(){
    adjustButtons();
});


$(function() {
    adjustButtons();
});

function adjustButtons() {
    var logo = $('#logo');
    var buttons = $('#start-buttons');
    if (logo && buttons) {
        if (logo.offset().top + logo.height() + buttons.height() + 50 > $(window).height()) {
            buttons.removeClass('start-buttons-absolute');
        }
        else {
            buttons.addClass('start-buttons-absolute');
        }
    }
}
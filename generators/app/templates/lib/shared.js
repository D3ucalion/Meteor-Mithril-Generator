Meteor.sharedFunctions = {
    fade: function(type, ms, el, full){
    full == null || full == undefined ? full = true : full;
    var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 50,
    duration = ms,
    gap = interval / duration;
    if(isIn) {
        full == true ? el.style.display = 'inline' : '';
        el.style.opacity = opacity;
    }

    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        el.style.opacity = opacity;

        full == true && opacity <= 0 ? el.style.display = 'none' : '';
        if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
    }
    var fading = window.setInterval(func, interval);
    }
}
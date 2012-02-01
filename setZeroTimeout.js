/**
 * If the browser is capable, tries zero timeout via postMessage (setTimeout can't go faster than 10ms).
 * Otherwise, it falls back to setTimeout(fn, delay) (which is the same as setTimeout(fn, 10) if under 10).
 * @function
 * @param {Function} fn
 * @param {int} delay
 * @example setZeroTimeout(function () { $.ajax('about:blank'); }, 0);
 */
var setZeroTimeout = (function (w) {
    if (w.postMessage) {
        var timeouts = [],
        msg_name = 'asc0tmot',

        // Like setTimeout, but only takes a function argument.  There's
        // no time argument (always zero) and no arguments (you have to
        // use a closure).
        _postTimeout = function (fn) {
            timeouts.push(fn);
            postMessage(msg_name, '*');
        },

        _handleMessage = function (event) {
            if (event.source == w && event.data == msg_name) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                if (timeouts.length) {
                    try {
                        timeouts.shift()();
                    } catch (e) {
                        // Throw in an asynchronous closure to prevent setZeroTimeout from hanging due to error
                        setTimeout((function (e) {
                            return function () {
                                throw e.stack || e;
                            };
                        }(e)), 0);
                    }
                }
                if (timeouts.length) { // more left?
                    postMessage(msg_name, '*');
                }
            }
        };

        if (w.addEventListener) {
            addEventListener('message', _handleMessage, true);
            return _postTimeout;
        } else if (w.attachEvent) {
            attachEvent('onmessage', _handleMessage);
            return _postTimeout;
        }
    }

    return setTimeout;
}(window));
// @allowJs: true
// @filename: innerscope2.js
// @out: dummy85.js
/** @constructor */
function Message(to) {

    var headers = {};

    /** document me */
    headers.to = to;

    (function() {
        var headers = {
            /** document me */
            cache: {}
        };

        /** document me */
        headers.from = '';
    })()
}

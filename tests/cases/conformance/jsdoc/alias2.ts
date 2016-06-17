// @allowJs: true
// @filename: alias2.js
// @out: dummy3.js
(function() {

    /** @alias ns.Myclass# */
    var x = {
        /** document me */
        myProperty: 'foo'
    }

    return x;
})();
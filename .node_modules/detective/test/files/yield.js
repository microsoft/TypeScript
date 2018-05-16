(function * () {
    var a = require('a');
    var b = yield require('c')(a);
})();

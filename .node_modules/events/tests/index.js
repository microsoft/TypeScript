
require('./legacy-compat');

// we do this to easily wrap each file in a mocha test
// and also have browserify be able to statically analyze this file
var orig_require = require;
var require = function(file) {
    test(file, function() {
        orig_require(file);
    });
};

require('./add-listeners.js');
require('./check-listener-leaks.js');
require('./listener-count.js');
require('./listeners-side-effects.js');
require('./listeners.js');
require('./max-listeners.js');
require('./modify-in-emit.js');
require('./num-args.js');
require('./once.js');
require('./set-max-listeners-side-effects.js');
require('./subclass.js');
require('./remove-all-listeners.js');
require('./remove-listeners.js');

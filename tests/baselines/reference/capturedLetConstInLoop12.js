//// [capturedLetConstInLoop12.ts]
(function() {
    "use strict";

    for (let i = 0; i < 4; i++) {
        (() => [i] = [i + 1])();
    }
})();

(function() {
    "use strict";

    for (let i = 0; i < 4; i++) {
        (() => ({a:i} = {a:i + 1}))();
    }
})();

//// [capturedLetConstInLoop12.js]
(function () {
    "use strict";
    var _loop_1 = function (i) {
        (function () {
            var _a;
            return _a = [i + 1], i = _a[0], _a;
        })();
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < 4; i++) {
        _loop_1(i);
        i = out_i_1;
    }
})();
(function () {
    "use strict";
    var _loop_2 = function (i) {
        (function () {
            var _a;
            return (_a = { a: i + 1 }, i = _a.a, _a);
        })();
        out_i_2 = i;
    };
    var out_i_2;
    for (var i = 0; i < 4; i++) {
        _loop_2(i);
        i = out_i_2;
    }
})();

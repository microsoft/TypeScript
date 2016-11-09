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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
(function () {
    "use strict";
    var _loop_1 = function (i) {
        (function () {
            return _a = [i + 1], _b = __read(_a, 1), i = _b[0], _a;
            var _a, _b;
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
            return (_a = { a: i + 1 }, i = _a.a, _a);
            var _a;
        })();
        out_i_2 = i;
    };
    var out_i_2;
    for (var i = 0; i < 4; i++) {
        _loop_2(i);
        i = out_i_2;
    }
})();

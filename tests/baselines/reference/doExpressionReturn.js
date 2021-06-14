//// [doExpressionReturn.ts]
function x() {
    const y = do { return }
}

function x() {
    const y = do {
        function z() {
            return
        }
        1
     }
}


//// [doExpressionReturn.js]
function x() { var _a; var _b = {}, _c; try {
    var y = ((function () { throw _b; })(), _a);
}
catch (_d) {
    if (_d == _b)
        return _c;
    throw _d;
} }
function x() {
    var _a;
    var y = ((function () {
        function z() {
            return;
        }
        _a = 1;
    })(), _a);
}

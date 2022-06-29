//// [issue49383.ts]
function wrap<Args extends unknown[]>(_: (...args: Args) => void) {}
wrap(({ cancelable } = {}) => {});


//// [issue49383.js]
function wrap(_) { }
wrap(function (_a) {
    var _b = _a === void 0 ? {} : _a, cancelable = _b.cancelable;
});

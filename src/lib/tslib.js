var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __awaiter = this.__awaiter || function (gen) {
    function step(result) {
        while (true) {
            var done = result.done, value = result.value, then;
            if (done) return value;
            if (value && typeof (then = value.then) === "function")
                return then.call(value,
                    function (value) { return step(gen.next(value)) },
                    function (reason) { return step(gen["throw"](reason)) });
            result = gen.next(value);
        }
    }
    return step(gen.next());
};
var __generator = this.__generator || function (body) {
    var done, finallyStack, executing, state;
    function step(opcode, arg) {
        var trys, region, tryLabel, catchLabel, finallyLabel, endLabel;
        if (executing) throw new TypeError("Generator is already executing.");
        state = state || { label: 0 };
        while (true) {
            executing = false;
            if (!done) {
                trys = state.trys;
                region = trys && trys[trys.length - 1];
                if (region) {
                    tryLabel = region[0];
                    catchLabel = region[1];
                    finallyLabel = region[2];
                    endLabel = region[3];
                }
                else if (opcode === 1 || opcode === 2) {
                    done = true;
                }
            }
            if (done) {
                finallyStack = void 0;
                switch (opcode) {
                    case 0 /*next*/: return { value: void 0, done: true };
                    case 1 /*throw*/: throw arg;
                    case 2 /*return*/: return { value: arg, done: true };
                }
            }
            switch (opcode) {
                case 0 /*next*/:
                    state.sent = arg;
                    break;
                case 4 /*yield*/:
                    state.label++;
                    return { value: arg, done: false };
                case 5 /*endfinally*/:
                    arg = finallyStack.pop(), opcode = finallyStack.pop();
                    trys.pop();
                    continue;
                default:
                    if (opcode === 3 /*break*/ && (!region || (arg > tryLabel && arg < endLabel))) {
                        state.label = arg;
                    }
                    else if (opcode === 1 /*throw*/ && state.label < catchLabel) {
                        state.error = arg;
                        state.label = catchLabel;
                    }
                    else if (state.label < finallyLabel) {
                        finallyStack = finallyStack || [];
                        finallyStack.push(opcode, arg);
                        state.label = finallyLabel;
                    }
                    else {
                        if (finallyLabel) finallyStack.pop(), finallyStack.pop();
                        trys.pop();
                        continue;
                    }
                    break;
            }
            executing = true;
            try {
                var operation = body(state);
                opcode = operation[0], arg = operation[1];
            } catch (e) {
                opcode = 1 /*throw*/, arg = e;
            }
        }
    }
    return {
        next: function (v) { return step(0 /*next*/, v); },
        "throw": function (v) { return step(1 /*throw*/, v); },
        "return": function (v) { return step(2 /*return*/, v); },
    };
};
//// [tests/cases/conformance/classes/members/privateNames/privateNameInLhsReceiverExpression.ts] ////

//// [privateNameInLhsReceiverExpression.ts]
class Test {
    #y = 123;
    static something(obj: { [key: string]: Test }) {
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y = 1;
        obj[(new class { #x = 1; readonly s = "prop"; }).s].#y += 1;
    }
}



//// [privateNameInLhsReceiverExpression.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Test_y;
class Test {
    constructor() {
        _Test_y.set(this, 123);
    }
    static something(obj) {
        var _x, _a, _x_1, _b, _c;
        __classPrivateFieldSet(obj[(new (_a = class {
                constructor() {
                    _x.set(this, 1);
                    this.s = "prop";
                }
            },
            _x = new WeakMap(),
            _a)).s], _Test_y, 1, "f");
        __classPrivateFieldSet(_c = obj[(new (_b = class {
                constructor() {
                    _x_1.set(this, 1);
                    this.s = "prop";
                }
            },
            _x_1 = new WeakMap(),
            _b)).s], _Test_y, __classPrivateFieldGet(_c, _Test_y, "f") + 1, "f");
    }
}
_Test_y = new WeakMap();

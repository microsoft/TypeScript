//// [tests/cases/conformance/classes/members/privateNames/privateWriteOnlyAccessorRead.ts] ////

//// [privateWriteOnlyAccessorRead.ts]
class Test {
  set #value(v: { foo: { bar: number } }) {}
  set #valueRest(v: number[]) {}
  set #valueOne(v: number) {}
  set #valueCompound(v: number) {}

  m() {
    const foo = { bar: 1 };
    console.log(this.#value); // error
    this.#value = { foo }; // ok
    this.#value = { foo }; // ok
    this.#value.foo = foo; // error

    ({ o: this.#value } = { o: { foo } }); //ok
    ({ ...this.#value } = { foo }); //ok

    ({ foo: this.#value.foo } = { foo }); //error
    ({
      foo: { ...this.#value.foo },
    } = { foo }); //error

    let r = { o: this.#value }; //error

    [this.#valueOne, ...this.#valueRest] = [1, 2, 3];
    let arr = [
        this.#valueOne,
        ...this.#valueRest
    ];

    this.#valueCompound += 3;
  }
}
new Test().m();


//// [privateWriteOnlyAccessorRead.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _Test_instances, _Test_value_set, _Test_valueRest_set, _Test_valueOne_set, _Test_valueCompound_set;
class Test {
    constructor() {
        _Test_instances.add(this);
    }
    m() {
        var _a, _b, _c, _d;
        const foo = { bar: 1 };
        console.log(__classPrivateFieldGet(this, _Test_instances, "a")); // error
        __classPrivateFieldSet(this, _Test_instances, { foo }, "a", _Test_value_set); // ok
        __classPrivateFieldSet(this, _Test_instances, { foo }, "a", _Test_value_set); // ok
        __classPrivateFieldGet(this, _Test_instances, "a").foo = foo; // error
        (_a = this, { o: ({ set value(_e) { __classPrivateFieldSet(_a, _Test_instances, _e, "a", _Test_value_set); } }).value } = { o: { foo } }); //ok
        (_b = this, ({ set value(_e) { __classPrivateFieldSet(_b, _Test_instances, _e, "a", _Test_value_set); } }).value = __rest({ foo }, [])); //ok
        ({ foo: __classPrivateFieldGet(this, _Test_instances, "a").foo } = { foo }); //error
        (__classPrivateFieldGet(this, _Test_instances, "a").foo = __rest({ foo }.foo, [])); //error
        let r = { o: __classPrivateFieldGet(this, _Test_instances, "a") }; //error
        _c = this, _d = this, [({ set value(_e) { __classPrivateFieldSet(_c, _Test_instances, _e, "a", _Test_valueOne_set); } }).value, ...({ set value(_e) { __classPrivateFieldSet(_d, _Test_instances, _e, "a", _Test_valueRest_set); } }).value] = [1, 2, 3];
        let arr = [
            __classPrivateFieldGet(this, _Test_instances, "a"),
            ...__classPrivateFieldGet(this, _Test_instances, "a")
        ];
        __classPrivateFieldSet(this, _Test_instances, __classPrivateFieldGet(this, _Test_instances, "a") + 3, "a", _Test_valueCompound_set);
    }
}
_Test_instances = new WeakSet(), _Test_value_set = function _Test_value_set(v) { }, _Test_valueRest_set = function _Test_valueRest_set(v) { }, _Test_valueOne_set = function _Test_valueOne_set(v) { }, _Test_valueCompound_set = function _Test_valueCompound_set(v) { };
new Test().m();

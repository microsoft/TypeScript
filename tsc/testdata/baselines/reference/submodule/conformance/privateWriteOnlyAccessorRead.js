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
class Test {
    set #value(v) { }
    set #valueRest(v) { }
    set #valueOne(v) { }
    set #valueCompound(v) { }
    m() {
        var _a, _b;
        const foo = { bar: 1 };
        console.log(this.#value); // error
        this.#value = { foo }; // ok
        this.#value = { foo }; // ok
        this.#value.foo = foo; // error
        ({ o: this.#value } = { o: { foo } }); //ok
        (_a = { foo }, this.#value = __rest(_a, [])); //ok
        ({ foo: this.#value.foo } = { foo }); //error
        (_b = { foo }, this.#value.foo = __rest(_b.foo, [])); //error
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

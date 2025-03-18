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
class Test {
    set #value(v) { }
    set #valueRest(v) { }
    set #valueOne(v) { }
    set #valueCompound(v) { }
    m() {
        const foo = { bar: 1 };
        console.log(this.#value);
        this.#value = { foo };
        this.#value = { foo };
        this.#value.foo = foo;
        ({ o: this.#value } = { o: { foo } });
        ({ ...this.#value } = { foo });
        ({ foo: this.#value.foo } = { foo });
        ({
            foo: { ...this.#value.foo },
        } = { foo });
        let r = { o: this.#value };
        [this.#valueOne, ...this.#valueRest] = [1, 2, 3];
        let arr = [
            this.#valueOne,
            ...this.#valueRest
        ];
        this.#valueCompound += 3;
    }
}
new Test().m();

//// [asyncMethodWithSuper_es6.ts]
class A {
    x() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        // call with property access
        super.x();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];
    }

    // async method with assignment/destructuring on 'super' requires a binding
    async advanced() {
        const f = () => {};

        // call with property access
        super.x();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];

        // property access (assign)
        super.x = f;

        // element access (assign)
        super["x"] = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // destructuring assign with element access
        ({ f: super["x"] } = { f });
    }
}

//// [asyncMethodWithSuper_es6.js]
class A {
    x() {
    }
}
class B extends A {
    // async method with only call/get on 'super' does not require a binding
    simple() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // call with property access
            _super("x").call(this);
            // call with element access
            _super("x").call(this);
            // property access (read)
            const a = _super("x");
            // element access (read)
            const b = _super("x");
        });
    }
    // async method with assignment/destructuring on 'super' requires a binding
    advanced() {
        const _super = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            // call with property access
            _super("x").value.call(this);
            // call with element access
            _super("x").value.call(this);
            // property access (read)
            const a = _super("x").value;
            // element access (read)
            const b = _super("x").value;
            // property access (assign)
            _super("x").value = f;
            // element access (assign)
            _super("x").value = f;
            // destructuring assign with property access
            ({ f: _super("x").value } = { f });
            // destructuring assign with element access
            ({ f: _super("x").value } = { f });
        });
    }
}

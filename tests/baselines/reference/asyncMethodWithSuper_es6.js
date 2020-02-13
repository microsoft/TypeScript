//// [asyncMethodWithSuper_es6.ts]
class A {
    x() {
    }
    y() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        // call with property access
        super.x();
        // call additional property.
        super.y();

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

        // property access in arrow
        (() => super.x());

        // element access in arrow
        (() => super["x"]());

        // property access in async arrow
        (async () => super.x());

        // element access in async arrow
        (async () => super["x"]());
    }

    async property_access_only_read_only() {
        // call with property access
        super.x();

        // property access (read)
        const a = super.x;

        // property access in arrow
        (() => super.x());

        // property access in async arrow
        (async () => super.x());
    }

    async property_access_only_write_only() {
        const f = () => {};

        // property access (assign)
        super.x = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // property access (assign) in arrow
        (() => super.x = f);

        // property access (assign) in async arrow
        (async () => super.x = f);
    }

    async element_access_only_read_only() {
        // call with element access
        super["x"]();

        // element access (read)
        const a = super["x"];

        // element access in arrow
        (() => super["x"]());

        // element access in async arrow
        (async () => super["x"]());
    }

    async element_access_only_write_only() {
        const f = () => {};

        // element access (assign)
        super["x"] = f;

        // destructuring assign with element access
        ({ f: super["x"] } = { f });

        // element access (assign) in arrow
        (() => super["x"] = f);

        // element access (assign) in async arrow
        (async () => super["x"] = f);
    }

    async * property_access_only_read_only_in_generator() {
        // call with property access
        super.x();

        // property access (read)
        const a = super.x;

        // property access in arrow
        (() => super.x());

        // property access in async arrow
        (async () => super.x());
    }

    async * property_access_only_write_only_in_generator() {
        const f = () => {};

        // property access (assign)
        super.x = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // property access (assign) in arrow
        (() => super.x = f);

        // property access (assign) in async arrow
        (async () => super.x = f);
    }

    async * element_access_only_read_only_in_generator() {
        // call with element access
        super["x"]();

        // element access (read)
        const a = super["x"];

        // element access in arrow
        (() => super["x"]());

        // element access in async arrow
        (async () => super["x"]());
    }

    async * element_access_only_write_only_in_generator() {
        const f = () => {};

        // element access (assign)
        super["x"] = f;

        // destructuring assign with element access
        ({ f: super["x"] } = { f });

        // element access (assign) in arrow
        (() => super["x"] = f);

        // element access (assign) in async arrow
        (async () => super["x"] = f);
    }
}


//// [asyncMethodWithSuper_es6.js]
class A {
    x() {
    }
    y() {
    }
}
class B extends A {
    // async method with only call/get on 'super' does not require a binding
    simple() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {
            x: { get: () => super.x },
            y: { get: () => super.y }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // call with property access
            _super.x.call(this);
            // call additional property.
            _super.y.call(this);
            // call with element access
            _superIndex("x").call(this);
            // property access (read)
            const a = _super.x;
            // element access (read)
            const b = _superIndex("x");
        });
    }
    // async method with assignment/destructuring on 'super' requires a binding
    advanced() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            // call with property access
            _super.x.call(this);
            // call with element access
            _superIndex("x").value.call(this);
            // property access (read)
            const a = _super.x;
            // element access (read)
            const b = _superIndex("x").value;
            // property access (assign)
            _super.x = f;
            // element access (assign)
            _superIndex("x").value = f;
            // destructuring assign with property access
            ({ f: _super.x } = { f });
            // destructuring assign with element access
            ({ f: _superIndex("x").value } = { f });
            // property access in arrow
            (() => _super.x.call(this));
            // element access in arrow
            (() => _superIndex("x").value.call(this));
            // property access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
            // element access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value.call(this); }));
        });
    }
    property_access_only_read_only() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // call with property access
            _super.x.call(this);
            // property access (read)
            const a = _super.x;
            // property access in arrow
            (() => _super.x.call(this));
            // property access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
        });
    }
    property_access_only_write_only() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            // property access (assign)
            _super.x = f;
            // destructuring assign with property access
            ({ f: _super.x } = { f });
            // property access (assign) in arrow
            (() => _super.x = f);
            // property access (assign) in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x = f; }));
        });
    }
    element_access_only_read_only() {
        const _superIndex = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // call with element access
            _superIndex("x").call(this);
            // element access (read)
            const a = _superIndex("x");
            // element access in arrow
            (() => _superIndex("x").call(this));
            // element access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").call(this); }));
        });
    }
    element_access_only_write_only() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            // element access (assign)
            _superIndex("x").value = f;
            // destructuring assign with element access
            ({ f: _superIndex("x").value } = { f });
            // element access (assign) in arrow
            (() => _superIndex("x").value = f);
            // element access (assign) in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value = f; }));
        });
    }
    property_access_only_read_only_in_generator() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __asyncGenerator(this, arguments, function* property_access_only_read_only_in_generator_1() {
            // call with property access
            _super.x.call(this);
            // property access (read)
            const a = _super.x;
            // property access in arrow
            (() => _super.x.call(this));
            // property access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
        });
    }
    property_access_only_write_only_in_generator() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __asyncGenerator(this, arguments, function* property_access_only_write_only_in_generator_1() {
            const f = () => { };
            // property access (assign)
            _super.x = f;
            // destructuring assign with property access
            ({ f: _super.x } = { f });
            // property access (assign) in arrow
            (() => _super.x = f);
            // property access (assign) in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x = f; }));
        });
    }
    element_access_only_read_only_in_generator() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {});
        return __asyncGenerator(this, arguments, function* element_access_only_read_only_in_generator_1() {
            // call with element access
            _superIndex("x").call(this);
            // element access (read)
            const a = _superIndex("x");
            // element access in arrow
            (() => _superIndex("x").call(this));
            // element access in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").call(this); }));
        });
    }
    element_access_only_write_only_in_generator() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        const _super = Object.create(null, {});
        return __asyncGenerator(this, arguments, function* element_access_only_write_only_in_generator_1() {
            const f = () => { };
            // element access (assign)
            _superIndex("x").value = f;
            // destructuring assign with element access
            ({ f: _superIndex("x").value } = { f });
            // element access (assign) in arrow
            (() => _superIndex("x").value = f);
            // element access (assign) in async arrow
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value = f; }));
        });
    }
}

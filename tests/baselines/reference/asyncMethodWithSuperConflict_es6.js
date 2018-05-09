//// [asyncMethodWithSuperConflict_es6.ts]
class A {
    x() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        const _super = null;
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
        const _super = null;
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

//// [asyncMethodWithSuperConflict_es6.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class A {
    x() {
    }
}
class B extends A {
    // async method with only call/get on 'super' does not require a binding
    simple() {
        const _super_1 = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const _super = null;
            // call with property access
            _super_1("x").call(this);
            // call with element access
            _super_1("x").call(this);
            // property access (read)
            const a = _super_1("x");
            // element access (read)
            const b = _super_1("x");
        });
    }
    // async method with assignment/destructuring on 'super' requires a binding
    advanced() {
        const _super_1 = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return __awaiter(this, void 0, void 0, function* () {
            const _super = null;
            const f = () => { };
            // call with property access
            _super_1("x").value.call(this);
            // call with element access
            _super_1("x").value.call(this);
            // property access (read)
            const a = _super_1("x").value;
            // element access (read)
            const b = _super_1("x").value;
            // property access (assign)
            _super_1("x").value = f;
            // element access (assign)
            _super_1("x").value = f;
            // destructuring assign with property access
            ({ f: _super_1("x").value } = { f });
            // destructuring assign with element access
            ({ f: _super_1("x").value } = { f });
        });
    }
}

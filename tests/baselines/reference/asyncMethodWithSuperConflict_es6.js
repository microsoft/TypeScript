//// [tests/cases/conformance/async/es2017/asyncMethodWithSuperConflict_es6.ts] ////

//// [asyncMethodWithSuperConflict_es6.ts]
class A {
    x() {
    }
    y() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        const _super = null;
        const _superIndex = null;
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
        const _super = null;
        const _superIndex = null;
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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class A {
    x() {
    }
    y() {
    }
}
class B extends A {
    // async method with only call/get on 'super' does not require a binding
    simple() {
        const _superIndex_1 = name => super[name];
        const _super_1 = Object.create(null, {
            x: { get: () => super.x },
            y: { get: () => super.y }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const _super = null;
            const _superIndex = null;
            // call with property access
            _super_1.x.call(this);
            // call additional property.
            _super_1.y.call(this);
            // call with element access
            _superIndex_1("x").call(this);
            // property access (read)
            const a = _super_1.x;
            // element access (read)
            const b = _superIndex_1("x");
        });
    }
    // async method with assignment/destructuring on 'super' requires a binding
    advanced() {
        const _superIndex_1 = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        const _super_1 = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const _super = null;
            const _superIndex = null;
            const f = () => { };
            // call with property access
            _super_1.x.call(this);
            // call with element access
            _superIndex_1("x").value.call(this);
            // property access (read)
            const a = _super_1.x;
            // element access (read)
            const b = _superIndex_1("x").value;
            // property access (assign)
            _super_1.x = f;
            // element access (assign)
            _superIndex_1("x").value = f;
            // destructuring assign with property access
            ({ f: _super_1.x } = { f });
            // destructuring assign with element access
            ({ f: _superIndex_1("x").value } = { f });
        });
    }
}

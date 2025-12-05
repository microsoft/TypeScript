//// [tests/cases/compiler/privateFieldsInClassExpressionDeclaration.ts] ////

//// [privateFieldsInClassExpressionDeclaration.ts]
export const ClassExpression = class {
    #context = 0;
    #method() { return 42; }
    public value = 1;
};

// Additional test with static private fields
export const ClassExpressionStatic = class {
    static #staticPrivate = "hidden";
    #instancePrivate = true;
    public exposed = "visible";
};

//// [privateFieldsInClassExpressionDeclaration.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _instances, _context, _method, _a, _b, _ClassExpressionStatic_staticPrivate, _ClassExpressionStatic_instancePrivate;
export const ClassExpression = (_a = class {
        constructor() {
            _instances.add(this);
            _context.set(this, 0);
            this.value = 1;
        }
    },
    _context = new WeakMap(),
    _instances = new WeakSet(),
    _method = function _method() { return 42; },
    _a);
// Additional test with static private fields
export const ClassExpressionStatic = (_b = class {
        constructor() {
            _ClassExpressionStatic_instancePrivate.set(this, true);
            this.exposed = "visible";
        }
    },
    _ClassExpressionStatic_instancePrivate = new WeakMap(),
    __setFunctionName(_b, "ClassExpressionStatic"),
    _ClassExpressionStatic_staticPrivate = { value: "hidden" },
    _b);

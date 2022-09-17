var __setFunctionName = (this && this.__setFunctionName) || function (f, name) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: name });
};
var _a;
const MyClass = (_a = class {
    },
    __setFunctionName(_a, "MyClass"),
    /*comment*/
    _a.newField = "x",
    _a);

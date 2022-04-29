//// [convertClassExpressionToFunctionFromObjectProperty1.ts]
const foo: any = {};

// properties
foo.x = class {
    constructor () {}
}
foo.y = class {
    constructor () {}
}

// keywords
foo.break = class {
    constructor () {}
}
foo.case = class {
    constructor () {}
}
foo.catch = class {
    constructor () {}
}
foo.class = class {
    constructor () {}
}
foo.const = class {
    constructor () {}
}
foo.continue = class {
    constructor () {}
}
foo.debugger = class {
    constructor () {}
}
foo.default = class {
    constructor () {}
}
foo.delete = class {
    constructor () {}
}
foo.do = class {
    constructor () {}
}
foo.else = class {
    constructor () {}
}
foo.enum = class {
    constructor () {}
}
foo.export = class {
    constructor () {}
}
foo.extends = class {
    constructor () {}
}
foo.false = class {
    constructor () {}
}
foo.finally = class {
    constructor () {}
}
foo.for = class {
    constructor () {}
}
foo.function = class {
    constructor () {}
}
foo.if = class {
    constructor () {}
}
foo.import = class {
    constructor () {}
}
foo.in = class {
    constructor () {}
}
foo.instanceof = class {
    constructor () {}
}
foo.new = class {
    constructor () {}
}
foo.null = class {
    constructor () {}
}
foo.return = class {
    constructor () {}
}
foo.super = class {
    constructor () {}
}
foo.switch = class {
    constructor () {}
}
foo.this = class {
    constructor () {}
}
foo.throw = class {
    constructor () {}
}
foo.true = class {
    constructor () {}
}
foo.try = class {
    constructor () {}
}
foo.typeof = class {
    constructor () {}
}
foo.var = class {
    constructor () {}
}
foo.void = class {
    constructor () {}
}
foo.while = class {
    constructor () {}
}
foo.with = class {
    constructor () {}
}
foo.implements = class {
    constructor () {}
}
foo.interface = class {
    constructor () {}
}
foo.let = class {
    constructor () {}
}
foo.package = class {
    constructor () {}
}
foo.private = class {
    constructor () {}
}
foo.protected = class {
    constructor () {}
}
foo.public = class {
    constructor () {}
}
foo.static = class {
    constructor () {}
}
foo.yield = class {
    constructor () {}
}
foo.abstract = class {
    constructor () {}
}
foo.as = class {
    constructor () {}
}
foo.asserts = class {
    constructor () {}
}
foo.any = class {
    constructor () {}
}
foo.async = class {
    constructor () {}
}
foo.await = class {
    constructor () {}
}
foo.boolean = class {
    constructor () {}
}
foo.constructor = class {
    constructor () {}
}
foo.declare = class {
    constructor () {}
}
foo.get = class {
    constructor () {}
}
foo.infer = class {
    constructor () {}
}
foo.is = class {
    constructor () {}
}
foo.keyof = class {
    constructor () {}
}
foo.module = class {
    constructor () {}
}
foo.namespace = class {
    constructor () {}
}
foo.never = class {
    constructor () {}
}
foo.readonly = class {
    constructor () {}
}
foo.require = class {
    constructor () {}
}
foo.number = class {
    constructor () {}
}
foo.object = class {
    constructor () {}
}
foo.set = class {
    constructor () {}
}
foo.string = class {
    constructor () {}
}
foo.symbol = class {
    constructor () {}
}
foo.type = class {
    constructor () {}
}
foo.undefined = class {
    constructor () {}
}
foo.unique = class {
    constructor () {}
}
foo.unknown = class {
    constructor () {}
}
foo.from = class {
    constructor () {}
}
foo.global = class {
    constructor () {}
}
foo.bigint = class {
    constructor () {}
}
foo.of = class {
    constructor () {}
}


//// [convertClassExpressionToFunctionFromObjectProperty1.js]
var foo = {};
// properties
foo.x = /** @class */ (function () {
    function x() {
    }
    return x;
}());
foo.y = /** @class */ (function () {
    function y() {
    }
    return y;
}());
// keywords
foo.break = /** @class */ (function () {
    function break_1() {
    }
    return break_1;
}());
foo.case = /** @class */ (function () {
    function case_1() {
    }
    return case_1;
}());
foo.catch = /** @class */ (function () {
    function catch_1() {
    }
    return catch_1;
}());
foo.class = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
foo.const = /** @class */ (function () {
    function const_1() {
    }
    return const_1;
}());
foo.continue = /** @class */ (function () {
    function continue_1() {
    }
    return continue_1;
}());
foo.debugger = /** @class */ (function () {
    function debugger_1() {
    }
    return debugger_1;
}());
foo.default = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
foo.delete = /** @class */ (function () {
    function delete_1() {
    }
    return delete_1;
}());
foo.do = /** @class */ (function () {
    function do_1() {
    }
    return do_1;
}());
foo.else = /** @class */ (function () {
    function else_1() {
    }
    return else_1;
}());
foo.enum = /** @class */ (function () {
    function enum_1() {
    }
    return enum_1;
}());
foo.export = /** @class */ (function () {
    function export_1() {
    }
    return export_1;
}());
foo.extends = /** @class */ (function () {
    function extends_1() {
    }
    return extends_1;
}());
foo.false = /** @class */ (function () {
    function false_1() {
    }
    return false_1;
}());
foo.finally = /** @class */ (function () {
    function finally_1() {
    }
    return finally_1;
}());
foo.for = /** @class */ (function () {
    function for_1() {
    }
    return for_1;
}());
foo.function = /** @class */ (function () {
    function function_1() {
    }
    return function_1;
}());
foo.if = /** @class */ (function () {
    function if_1() {
    }
    return if_1;
}());
foo.import = /** @class */ (function () {
    function import_1() {
    }
    return import_1;
}());
foo.in = /** @class */ (function () {
    function in_1() {
    }
    return in_1;
}());
foo.instanceof = /** @class */ (function () {
    function instanceof_1() {
    }
    return instanceof_1;
}());
foo.new = /** @class */ (function () {
    function new_1() {
    }
    return new_1;
}());
foo.null = /** @class */ (function () {
    function null_1() {
    }
    return null_1;
}());
foo.return = /** @class */ (function () {
    function return_1() {
    }
    return return_1;
}());
foo.super = /** @class */ (function () {
    function super_1() {
    }
    return super_1;
}());
foo.switch = /** @class */ (function () {
    function switch_1() {
    }
    return switch_1;
}());
foo.this = /** @class */ (function () {
    function this_1() {
    }
    return this_1;
}());
foo.throw = /** @class */ (function () {
    function throw_1() {
    }
    return throw_1;
}());
foo.true = /** @class */ (function () {
    function true_1() {
    }
    return true_1;
}());
foo.try = /** @class */ (function () {
    function try_1() {
    }
    return try_1;
}());
foo.typeof = /** @class */ (function () {
    function typeof_1() {
    }
    return typeof_1;
}());
foo.var = /** @class */ (function () {
    function var_1() {
    }
    return var_1;
}());
foo.void = /** @class */ (function () {
    function void_1() {
    }
    return void_1;
}());
foo.while = /** @class */ (function () {
    function while_1() {
    }
    return while_1;
}());
foo.with = /** @class */ (function () {
    function with_1() {
    }
    return with_1;
}());
foo.implements = /** @class */ (function () {
    function implements_1() {
    }
    return implements_1;
}());
foo.interface = /** @class */ (function () {
    function interface_1() {
    }
    return interface_1;
}());
foo.let = /** @class */ (function () {
    function let_1() {
    }
    return let_1;
}());
foo.package = /** @class */ (function () {
    function package_1() {
    }
    return package_1;
}());
foo.private = /** @class */ (function () {
    function private_1() {
    }
    return private_1;
}());
foo.protected = /** @class */ (function () {
    function protected_1() {
    }
    return protected_1;
}());
foo.public = /** @class */ (function () {
    function public_1() {
    }
    return public_1;
}());
foo.static = /** @class */ (function () {
    function static_1() {
    }
    return static_1;
}());
foo.yield = /** @class */ (function () {
    function yield_1() {
    }
    return yield_1;
}());
foo.abstract = /** @class */ (function () {
    function abstract() {
    }
    return abstract;
}());
foo.as = /** @class */ (function () {
    function as() {
    }
    return as;
}());
foo.asserts = /** @class */ (function () {
    function asserts() {
    }
    return asserts;
}());
foo.any = /** @class */ (function () {
    function any() {
    }
    return any;
}());
foo.async = /** @class */ (function () {
    function async() {
    }
    return async;
}());
foo.await = /** @class */ (function () {
    function await() {
    }
    return await;
}());
foo.boolean = /** @class */ (function () {
    function boolean() {
    }
    return boolean;
}());
foo.constructor = /** @class */ (function () {
    function constructor() {
    }
    return constructor;
}());
foo.declare = /** @class */ (function () {
    function declare() {
    }
    return declare;
}());
foo.get = /** @class */ (function () {
    function get() {
    }
    return get;
}());
foo.infer = /** @class */ (function () {
    function infer() {
    }
    return infer;
}());
foo.is = /** @class */ (function () {
    function is() {
    }
    return is;
}());
foo.keyof = /** @class */ (function () {
    function keyof() {
    }
    return keyof;
}());
foo.module = /** @class */ (function () {
    function module() {
    }
    return module;
}());
foo.namespace = /** @class */ (function () {
    function namespace() {
    }
    return namespace;
}());
foo.never = /** @class */ (function () {
    function never() {
    }
    return never;
}());
foo.readonly = /** @class */ (function () {
    function readonly() {
    }
    return readonly;
}());
foo.require = /** @class */ (function () {
    function require() {
    }
    return require;
}());
foo.number = /** @class */ (function () {
    function number() {
    }
    return number;
}());
foo.object = /** @class */ (function () {
    function object() {
    }
    return object;
}());
foo.set = /** @class */ (function () {
    function set() {
    }
    return set;
}());
foo.string = /** @class */ (function () {
    function string() {
    }
    return string;
}());
foo.symbol = /** @class */ (function () {
    function symbol() {
    }
    return symbol;
}());
foo.type = /** @class */ (function () {
    function type() {
    }
    return type;
}());
foo.undefined = /** @class */ (function () {
    function undefined() {
    }
    return undefined;
}());
foo.unique = /** @class */ (function () {
    function unique() {
    }
    return unique;
}());
foo.unknown = /** @class */ (function () {
    function unknown() {
    }
    return unknown;
}());
foo.from = /** @class */ (function () {
    function from() {
    }
    return from;
}());
foo.global = /** @class */ (function () {
    function global() {
    }
    return global;
}());
foo.bigint = /** @class */ (function () {
    function bigint() {
    }
    return bigint;
}());
foo.of = /** @class */ (function () {
    function of() {
    }
    return of;
}());

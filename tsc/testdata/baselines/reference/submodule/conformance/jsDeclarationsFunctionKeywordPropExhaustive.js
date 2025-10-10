//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionKeywordPropExhaustive.ts] ////

//// [source.js]
function foo() {}
// properties
foo.x = 1;
foo.y = 1;

// keywords
foo.break = 1;
foo.case = 1;
foo.catch = 1;
foo.class = 1;
foo.const = 1;
foo.continue = 1;
foo.debugger = 1;
foo.default = 1;
foo.delete = 1;
foo.do = 1;
foo.else = 1;
foo.enum = 1;
foo.export = 1;
foo.extends = 1;
foo.false = 1;
foo.finally = 1;
foo.for = 1;
foo.function = 1;
foo.if = 1;
foo.import = 1;
foo.in = 1;
foo.instanceof = 1;
foo.new = 1;
foo.null = 1;
foo.return = 1;
foo.super = 1;
foo.switch = 1;
foo.this = 1;
foo.throw = 1;
foo.true = 1;
foo.try = 1;
foo.typeof = 1;
foo.var = 1;
foo.void = 1;
foo.while = 1;
foo.with = 1;
foo.implements = 1;
foo.interface = 1;
foo.let = 1;
foo.package = 1;
foo.private = 1;
foo.protected = 1;
foo.public = 1;
foo.static = 1;
foo.yield = 1;
foo.abstract = 1;
foo.as = 1;
foo.asserts = 1;
foo.any = 1;
foo.async = 1;
foo.await = 1;
foo.boolean = 1;
foo.constructor = 1;
foo.declare = 1;
foo.get = 1;
foo.infer = 1;
foo.is = 1;
foo.keyof = 1;
foo.module = 1;
foo.namespace = 1;
foo.never = 1;
foo.readonly = 1;
foo.require = 1;
foo.number = 1;
foo.object = 1;
foo.set = 1;
foo.string = 1;
foo.symbol = 1;
foo.type = 1;
foo.undefined = 1;
foo.unique = 1;
foo.unknown = 1;
foo.from = 1;
foo.global = 1;
foo.bigint = 1;
foo.of = 1;

//// [source.js]
function foo() { }
// properties
foo.x = 1;
foo.y = 1;
// keywords
foo.break = 1;
foo.case = 1;
foo.catch = 1;
foo.class = 1;
foo.const = 1;
foo.continue = 1;
foo.debugger = 1;
foo.default = 1;
foo.delete = 1;
foo.do = 1;
foo.else = 1;
foo.enum = 1;
foo.export = 1;
foo.extends = 1;
foo.false = 1;
foo.finally = 1;
foo.for = 1;
foo.function = 1;
foo.if = 1;
foo.import = 1;
foo.in = 1;
foo.instanceof = 1;
foo.new = 1;
foo.null = 1;
foo.return = 1;
foo.super = 1;
foo.switch = 1;
foo.this = 1;
foo.throw = 1;
foo.true = 1;
foo.try = 1;
foo.typeof = 1;
foo.var = 1;
foo.void = 1;
foo.while = 1;
foo.with = 1;
foo.implements = 1;
foo.interface = 1;
foo.let = 1;
foo.package = 1;
foo.private = 1;
foo.protected = 1;
foo.public = 1;
foo.static = 1;
foo.yield = 1;
foo.abstract = 1;
foo.as = 1;
foo.asserts = 1;
foo.any = 1;
foo.async = 1;
foo.await = 1;
foo.boolean = 1;
foo.constructor = 1;
foo.declare = 1;
foo.get = 1;
foo.infer = 1;
foo.is = 1;
foo.keyof = 1;
foo.module = 1;
foo.namespace = 1;
foo.never = 1;
foo.readonly = 1;
foo.require = 1;
foo.number = 1;
foo.object = 1;
foo.set = 1;
foo.string = 1;
foo.symbol = 1;
foo.type = 1;
foo.undefined = 1;
foo.unique = 1;
foo.unknown = 1;
foo.from = 1;
foo.global = 1;
foo.bigint = 1;
foo.of = 1;


//// [source.d.ts]
declare function foo(): void;
declare namespace foo {
    var x: number;
}
declare namespace foo {
    var y: number;
}
declare namespace foo {
    var _a: number;
    export { _a as break };
}
declare namespace foo {
    var _b: number;
    export { _b as case };
}
declare namespace foo {
    var _c: number;
    export { _c as catch };
}
declare namespace foo {
    var _d: number;
    export { _d as class };
}
declare namespace foo {
    var _e: number;
    export { _e as const };
}
declare namespace foo {
    var _f: number;
    export { _f as continue };
}
declare namespace foo {
    var _g: number;
    export { _g as debugger };
}
declare namespace foo {
    var _h: number;
    export { _h as default };
}
declare namespace foo {
    var _j: number;
    export { _j as delete };
}
declare namespace foo {
    var _k: number;
    export { _k as do };
}
declare namespace foo {
    var _l: number;
    export { _l as else };
}
declare namespace foo {
    var _m: number;
    export { _m as enum };
}
declare namespace foo {
    var _o: number;
    export { _o as export };
}
declare namespace foo {
    var _p: number;
    export { _p as extends };
}
declare namespace foo {
    var _q: number;
    export { _q as false };
}
declare namespace foo {
    var _r: number;
    export { _r as finally };
}
declare namespace foo {
    var _s: number;
    export { _s as for };
}
declare namespace foo {
    var _t: number;
    export { _t as function };
}
declare namespace foo {
    var _u: number;
    export { _u as if };
}
declare namespace foo {
    var _v: number;
    export { _v as import };
}
declare namespace foo {
    var _w: number;
    export { _w as in };
}
declare namespace foo {
    var _x: number;
    export { _x as instanceof };
}
declare namespace foo {
    var _y: number;
    export { _y as new };
}
declare namespace foo {
    var _z: number;
    export { _z as null };
}
declare namespace foo {
    var _0: number;
    export { _0 as return };
}
declare namespace foo {
    var _1: number;
    export { _1 as super };
}
declare namespace foo {
    var _2: number;
    export { _2 as switch };
}
declare namespace foo {
    var _3: number;
    export { _3 as this };
}
declare namespace foo {
    var _4: number;
    export { _4 as throw };
}
declare namespace foo {
    var _5: number;
    export { _5 as true };
}
declare namespace foo {
    var _6: number;
    export { _6 as try };
}
declare namespace foo {
    var _7: number;
    export { _7 as typeof };
}
declare namespace foo {
    var _8: number;
    export { _8 as var };
}
declare namespace foo {
    var _9: number;
    export { _9 as void };
}
declare namespace foo {
    var _10: number;
    export { _10 as while };
}
declare namespace foo {
    var _11: number;
    export { _11 as with };
}
declare namespace foo {
    var _12: number;
    export { _12 as implements };
}
declare namespace foo {
    var _13: number;
    export { _13 as interface };
}
declare namespace foo {
    var _14: number;
    export { _14 as let };
}
declare namespace foo {
    var _15: number;
    export { _15 as package };
}
declare namespace foo {
    var _16: number;
    export { _16 as private };
}
declare namespace foo {
    var _17: number;
    export { _17 as protected };
}
declare namespace foo {
    var _18: number;
    export { _18 as public };
}
declare namespace foo {
    var _19: number;
    export { _19 as static };
}
declare namespace foo {
    var _20: number;
    export { _20 as yield };
}
declare namespace foo {
    var abstract: number;
}
declare namespace foo {
    var as: number;
}
declare namespace foo {
    var asserts: number;
}
declare namespace foo {
    var any: number;
}
declare namespace foo {
    var async: number;
}
declare namespace foo {
    var await: number;
}
declare namespace foo {
    var boolean: number;
}
declare namespace foo {
    var constructor: number;
}
declare namespace foo {
    var declare: number;
}
declare namespace foo {
    var get: number;
}
declare namespace foo {
    var infer: number;
}
declare namespace foo {
    var is: number;
}
declare namespace foo {
    var keyof: number;
}
declare namespace foo {
    var module: number;
}
declare namespace foo {
    var namespace: number;
}
declare namespace foo {
    var never: number;
}
declare namespace foo {
    var readonly: number;
}
declare namespace foo {
    var require: number;
}
declare namespace foo {
    var number: number;
}
declare namespace foo {
    var object: number;
}
declare namespace foo {
    var set: number;
}
declare namespace foo {
    var string: number;
}
declare namespace foo {
    var symbol: number;
}
declare namespace foo {
    var type: number;
}
declare namespace foo {
    var undefined: number;
}
declare namespace foo {
    var unique: number;
}
declare namespace foo {
    var unknown: number;
}
declare namespace foo {
    var from: number;
}
declare namespace foo {
    var global: number;
}
declare namespace foo {
    var bigint: number;
}
declare namespace foo {
    var of: number;
}

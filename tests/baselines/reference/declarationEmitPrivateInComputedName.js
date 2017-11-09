//// [declarationEmitPrivateInComputedName.ts]
enum MyEnum {
    member = 0
}

export const someVar1 = {
    [MyEnum.member]: ""
};

enum MyStringEnum {
    str = "str"
}

export const someVar2 = {
    [MyStringEnum.str]: ""
};

export enum MyExportEnum {
    member = 0
}

export const someVar3 = {
    [MyExportEnum.member]: ""
};

export enum MyExportStringEnum {
    str = "str"
}

export const someVar4 = {
    [MyExportStringEnum.str]: ""
};

enum MyComputedEnum {
    member = Math.random()
}

export const someVar5 = {
    [MyComputedEnum.member]: ""
};


//// [declarationEmitPrivateInComputedName.js]
"use strict";
exports.__esModule = true;
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["member"] = 0] = "member";
})(MyEnum || (MyEnum = {}));
exports.someVar1 = (_a = {},
    _a[MyEnum.member] = "",
    _a);
var MyStringEnum;
(function (MyStringEnum) {
    MyStringEnum["str"] = "str";
})(MyStringEnum || (MyStringEnum = {}));
exports.someVar2 = (_b = {},
    _b[MyStringEnum.str] = "",
    _b);
var MyExportEnum;
(function (MyExportEnum) {
    MyExportEnum[MyExportEnum["member"] = 0] = "member";
})(MyExportEnum = exports.MyExportEnum || (exports.MyExportEnum = {}));
exports.someVar3 = (_c = {},
    _c[MyExportEnum.member] = "",
    _c);
var MyExportStringEnum;
(function (MyExportStringEnum) {
    MyExportStringEnum["str"] = "str";
})(MyExportStringEnum = exports.MyExportStringEnum || (exports.MyExportStringEnum = {}));
exports.someVar4 = (_d = {},
    _d[MyExportStringEnum.str] = "",
    _d);
var MyComputedEnum;
(function (MyComputedEnum) {
    MyComputedEnum[MyComputedEnum["member"] = Math.random()] = "member";
})(MyComputedEnum || (MyComputedEnum = {}));
exports.someVar5 = (_e = {},
    _e[MyComputedEnum.member] = "",
    _e);
var _a, _b, _c, _d, _e;


//// [declarationEmitPrivateInComputedName.d.ts]
export declare const someVar1: {
    [0]: string;
};
export declare const someVar2: {
    ["str"]: string;
};
export declare enum MyExportEnum {
    member = 0,
}
export declare const someVar3: {
    [0]: string;
};
export declare enum MyExportStringEnum {
    str = "str",
}
export declare const someVar4: {
    ["str"]: string;
};
export declare const someVar5: {
    [x: number]: string;
};

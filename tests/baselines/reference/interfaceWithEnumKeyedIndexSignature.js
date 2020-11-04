//// [interfaceWithEnumKeyedIndexSignature.ts]
export interface UserInterfaceColors {
    [index: UserInterfaceElement]: ColorInfo;
}
export interface ColorInfo {
    r: number;
    g: number;
    b: number;
    a: number;
}
export enum UserInterfaceElement {
    ActiveTitleBar = 0,
    InactiveTitleBar = 1,
}

const x: UserInterfaceColors = null as any;

declare function expectColInfo(x: ColorInfo): void;

// correct uses
expectColInfo(x[UserInterfaceElement.ActiveTitleBar]);
expectColInfo(x[UserInterfaceElement.InactiveTitleBar]);
expectColInfo(x[0]);
expectColInfo(x[1]);
expectColInfo(x["0"]);
expectColInfo(x["1"]);

// errors
expectColInfo(x[0 as number]);
expectColInfo(x["0" as string]);
expectColInfo(x[12]);

export interface UserInterfaceColors2 {
    [index: UserInterfaceElement2]: ColorInfo;
}
export enum UserInterfaceElement2 {
    ActiveTitleBar = "Active",
    InactiveTitleBar = "Inactive",
}

const x2: UserInterfaceColors2 = null as any;


// correct uses
expectColInfo(x2[UserInterfaceElement2.ActiveTitleBar]);
expectColInfo(x2[UserInterfaceElement2.InactiveTitleBar]);

// errors
expectColInfo(x2[0]);
expectColInfo(x2[1]);
expectColInfo(x2["0"]);
expectColInfo(x2["1"]);
expectColInfo(x2[0 as number]);
expectColInfo(x2["0" as string]);
expectColInfo(x2[12]);


//// [interfaceWithEnumKeyedIndexSignature.js]
"use strict";
exports.__esModule = true;
exports.UserInterfaceElement2 = exports.UserInterfaceElement = void 0;
var UserInterfaceElement;
(function (UserInterfaceElement) {
    UserInterfaceElement[UserInterfaceElement["ActiveTitleBar"] = 0] = "ActiveTitleBar";
    UserInterfaceElement[UserInterfaceElement["InactiveTitleBar"] = 1] = "InactiveTitleBar";
})(UserInterfaceElement = exports.UserInterfaceElement || (exports.UserInterfaceElement = {}));
var x = null;
// correct uses
expectColInfo(x[UserInterfaceElement.ActiveTitleBar]);
expectColInfo(x[UserInterfaceElement.InactiveTitleBar]);
expectColInfo(x[0]);
expectColInfo(x[1]);
expectColInfo(x["0"]);
expectColInfo(x["1"]);
// errors
expectColInfo(x[0]);
expectColInfo(x["0"]);
expectColInfo(x[12]);
var UserInterfaceElement2;
(function (UserInterfaceElement2) {
    UserInterfaceElement2["ActiveTitleBar"] = "Active";
    UserInterfaceElement2["InactiveTitleBar"] = "Inactive";
})(UserInterfaceElement2 = exports.UserInterfaceElement2 || (exports.UserInterfaceElement2 = {}));
var x2 = null;
// correct uses
expectColInfo(x2[UserInterfaceElement2.ActiveTitleBar]);
expectColInfo(x2[UserInterfaceElement2.InactiveTitleBar]);
// errors
expectColInfo(x2[0]);
expectColInfo(x2[1]);
expectColInfo(x2["0"]);
expectColInfo(x2["1"]);
expectColInfo(x2[0]);
expectColInfo(x2["0"]);
expectColInfo(x2[12]);

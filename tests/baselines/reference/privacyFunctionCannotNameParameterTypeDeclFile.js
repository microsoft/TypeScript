//// [tests/cases/compiler/privacyFunctionCannotNameParameterTypeDeclFile.ts] ////

//// [privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.ts]
declare module "GlobalWidgets" {
    export class Widget3 {
        name: string;
    }
    export function createWidget3(): Widget3;

    export module SpecializedGlobalWidget {
        export class Widget4 {
            name: string;
        }
        function createWidget4(): Widget4;
    }
}

//// [privacyFunctionCannotNameParameterTypeDeclFile_Widgets.ts]
export class Widget1 {
    name = 'one';
}
export function createWidget1() {
    return new Widget1();
}

export module SpecializedWidget {
    export class Widget2 {
        name = 'one';
    }
    export function createWidget2() {
        return new Widget2();
    }
}

//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.ts]
///<reference path='privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.ts'/>
import Widgets = require("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export function createExportedWidget1() {
    return Widgets.createWidget1();
}
export function createExportedWidget2() {
    return Widgets.SpecializedWidget.createWidget2();
}
export function createExportedWidget3() {
    return Widgets1.createWidget3();
}
export function createExportedWidget4() {
    return Widgets1.SpecializedGlobalWidget.createWidget4();
}

//// [privacyFunctionCannotNameParameterTypeDeclFile_consumer.ts]
import exporter = require("./privacyFunctionCannotNameParameterTypeDeclFile_exporter");
export class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(param = exporter.createExportedWidget1()) { // Error
    }
    private static myPrivateStaticMethod(param = exporter.createExportedWidget1()) {
    }
    myPublicMethod(param  = exporter.createExportedWidget1()) { // Error
    }
    private myPrivateMethod(param = exporter.createExportedWidget1()) {
    }
    constructor(param = exporter.createExportedWidget1(), private param1 = exporter.createExportedWidget1(), public param2 = exporter.createExportedWidget1()) { // Error
    }
}
export class publicClassWithWithPrivateParmeterTypes1 {
    static myPublicStaticMethod(param = exporter.createExportedWidget3()) { // Error
    }
    private static myPrivateStaticMethod(param = exporter.createExportedWidget3()) {
    }
    myPublicMethod(param  = exporter.createExportedWidget3()) { // Error
    }
    private myPrivateMethod(param = exporter.createExportedWidget3()) {
    }
    constructor(param = exporter.createExportedWidget3(), private param1 = exporter.createExportedWidget3(), public param2 = exporter.createExportedWidget3()) { // Error
    }
}

class privateClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(param = exporter.createExportedWidget1()) {
    }
    private static myPrivateStaticMethod(param = exporter.createExportedWidget1()) {
    }
    myPublicMethod(param  = exporter.createExportedWidget1()) {
    }
    private myPrivateMethod(param = exporter.createExportedWidget1()) {
    }
    constructor(param = exporter.createExportedWidget1(), private param1 = exporter.createExportedWidget1(), public param2 = exporter.createExportedWidget1()) {
    }
}
class privateClassWithWithPrivateParmeterTypes2 {
    static myPublicStaticMethod(param = exporter.createExportedWidget3()) {
    }
    private static myPrivateStaticMethod(param = exporter.createExportedWidget3()) {
    }
    myPublicMethod(param  = exporter.createExportedWidget3()) {
    }
    private myPrivateMethod(param = exporter.createExportedWidget3()) {
    }
    constructor(param = exporter.createExportedWidget3(), private param1 = exporter.createExportedWidget3(), public param2 = exporter.createExportedWidget3()) {
    }
}

export function publicFunctionWithPrivateParmeterTypes(param = exporter.createExportedWidget1()) { // Error
}
function privateFunctionWithPrivateParmeterTypes(param = exporter.createExportedWidget1()) {
}
export function publicFunctionWithPrivateParmeterTypes1(param = exporter.createExportedWidget3()) { // Error
}
function privateFunctionWithPrivateParmeterTypes1(param = exporter.createExportedWidget3()) {
}


export class publicClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(param= exporter.createExportedWidget2()) { // Error
    }
    myPublicMethod(param= exporter.createExportedWidget2()) { // Error
    }
    constructor(param= exporter.createExportedWidget2(), private param1= exporter.createExportedWidget2(), public param2= exporter.createExportedWidget2()) { // Error
    }
}
export class publicClassWithPrivateModuleParameterTypes2 {
    static myPublicStaticMethod(param= exporter.createExportedWidget4()) { // Error
    }
    myPublicMethod(param= exporter.createExportedWidget4()) { // Error
    }
    constructor(param= exporter.createExportedWidget4(), private param1= exporter.createExportedWidget4(), public param2= exporter.createExportedWidget4()) { // Error
    }
}
export function publicFunctionWithPrivateModuleParameterTypes(param= exporter.createExportedWidget2()) { // Error
}
export function publicFunctionWithPrivateModuleParameterTypes1(param= exporter.createExportedWidget4()) { // Error
}


class privateClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(param= exporter.createExportedWidget2()) {
    }
    myPublicMethod(param= exporter.createExportedWidget2()) {
    }
    constructor(param= exporter.createExportedWidget2(), private param1= exporter.createExportedWidget2(), public param2= exporter.createExportedWidget2()) {
    }
}
class privateClassWithPrivateModuleParameterTypes1 {
    static myPublicStaticMethod(param= exporter.createExportedWidget4()) {
    }
    myPublicMethod(param= exporter.createExportedWidget4()) {
    }
    constructor(param= exporter.createExportedWidget4(), private param1= exporter.createExportedWidget4(), public param2= exporter.createExportedWidget4()) {
    }
}
function privateFunctionWithPrivateModuleParameterTypes(param= exporter.createExportedWidget2()) {
}
function privateFunctionWithPrivateModuleParameterTypes1(param= exporter.createExportedWidget4()) {
}

//// [privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.js]
//// [privacyFunctionCannotNameParameterTypeDeclFile_Widgets.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializedWidget = exports.Widget1 = void 0;
exports.createWidget1 = createWidget1;
var Widget1 = /** @class */ (function () {
    function Widget1() {
        this.name = 'one';
    }
    return Widget1;
}());
exports.Widget1 = Widget1;
function createWidget1() {
    return new Widget1();
}
var SpecializedWidget;
(function (SpecializedWidget) {
    var Widget2 = /** @class */ (function () {
        function Widget2() {
            this.name = 'one';
        }
        return Widget2;
    }());
    SpecializedWidget.Widget2 = Widget2;
    function createWidget2() {
        return new Widget2();
    }
    SpecializedWidget.createWidget2 = createWidget2;
})(SpecializedWidget || (exports.SpecializedWidget = SpecializedWidget = {}));
//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
///<reference path='privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.ts'/>
var Widgets = require("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
var Widgets1 = require("GlobalWidgets");
function createExportedWidget1() {
    return Widgets.createWidget1();
}
function createExportedWidget2() {
    return Widgets.SpecializedWidget.createWidget2();
}
function createExportedWidget3() {
    return Widgets1.createWidget3();
}
function createExportedWidget4() {
    return Widgets1.SpecializedGlobalWidget.createWidget4();
}
//// [privacyFunctionCannotNameParameterTypeDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithPrivateModuleParameterTypes2 = exports.publicClassWithPrivateModuleParameterTypes = exports.publicClassWithWithPrivateParmeterTypes1 = exports.publicClassWithWithPrivateParmeterTypes = void 0;
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
exports.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
var exporter = require("./privacyFunctionCannotNameParameterTypeDeclFile_exporter");
var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget1(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget1(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    return publicClassWithWithPrivateParmeterTypes;
}());
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var publicClassWithWithPrivateParmeterTypes1 = /** @class */ (function () {
    function publicClassWithWithPrivateParmeterTypes1(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget3(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget3(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParmeterTypes1.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    publicClassWithWithPrivateParmeterTypes1.myPrivateStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    publicClassWithWithPrivateParmeterTypes1.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    publicClassWithWithPrivateParmeterTypes1.prototype.myPrivateMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    return publicClassWithWithPrivateParmeterTypes1;
}());
exports.publicClassWithWithPrivateParmeterTypes1 = publicClassWithWithPrivateParmeterTypes1;
var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget1(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget1(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget1(); }
    };
    return privateClassWithWithPrivateParmeterTypes;
}());
var privateClassWithWithPrivateParmeterTypes2 = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes2(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget3(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget3(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParmeterTypes2.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    privateClassWithWithPrivateParmeterTypes2.myPrivateStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    privateClassWithWithPrivateParmeterTypes2.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    privateClassWithWithPrivateParmeterTypes2.prototype.myPrivateMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget3(); }
    };
    return privateClassWithWithPrivateParmeterTypes2;
}());
function publicFunctionWithPrivateParmeterTypes(param) {
    if (param === void 0) { param = exporter.createExportedWidget1(); }
}
function privateFunctionWithPrivateParmeterTypes(param) {
    if (param === void 0) { param = exporter.createExportedWidget1(); }
}
function publicFunctionWithPrivateParmeterTypes1(param) {
    if (param === void 0) { param = exporter.createExportedWidget3(); }
}
function privateFunctionWithPrivateParmeterTypes1(param) {
    if (param === void 0) { param = exporter.createExportedWidget3(); }
}
var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget2(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget2(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
    };
    publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
    };
    return publicClassWithPrivateModuleParameterTypes;
}());
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
var publicClassWithPrivateModuleParameterTypes2 = /** @class */ (function () {
    function publicClassWithPrivateModuleParameterTypes2(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget4(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget4(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithPrivateModuleParameterTypes2.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
    };
    publicClassWithPrivateModuleParameterTypes2.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
    };
    return publicClassWithPrivateModuleParameterTypes2;
}());
exports.publicClassWithPrivateModuleParameterTypes2 = publicClassWithPrivateModuleParameterTypes2;
function publicFunctionWithPrivateModuleParameterTypes(param) {
    if (param === void 0) { param = exporter.createExportedWidget2(); }
}
function publicFunctionWithPrivateModuleParameterTypes1(param) {
    if (param === void 0) { param = exporter.createExportedWidget4(); }
}
var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget2(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget2(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
    };
    privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget2(); }
    };
    return privateClassWithPrivateModuleParameterTypes;
}());
var privateClassWithPrivateModuleParameterTypes1 = /** @class */ (function () {
    function privateClassWithPrivateModuleParameterTypes1(param, param1, param2) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
        if (param1 === void 0) { param1 = exporter.createExportedWidget4(); }
        if (param2 === void 0) { param2 = exporter.createExportedWidget4(); }
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithPrivateModuleParameterTypes1.myPublicStaticMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
    };
    privateClassWithPrivateModuleParameterTypes1.prototype.myPublicMethod = function (param) {
        if (param === void 0) { param = exporter.createExportedWidget4(); }
    };
    return privateClassWithPrivateModuleParameterTypes1;
}());
function privateFunctionWithPrivateModuleParameterTypes(param) {
    if (param === void 0) { param = exporter.createExportedWidget2(); }
}
function privateFunctionWithPrivateModuleParameterTypes1(param) {
    if (param === void 0) { param = exporter.createExportedWidget4(); }
}


//// [privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.d.ts]
declare module "GlobalWidgets" {
    class Widget3 {
        name: string;
    }
    function createWidget3(): Widget3;
    namespace SpecializedGlobalWidget {
        class Widget4 {
            name: string;
        }
        function createWidget4(): Widget4;
    }
}
//// [privacyFunctionCannotNameParameterTypeDeclFile_Widgets.d.ts]
export declare class Widget1 {
    name: string;
}
export declare function createWidget1(): Widget1;
export declare namespace SpecializedWidget {
    class Widget2 {
        name: string;
    }
    function createWidget2(): Widget2;
}
//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.d.ts]
import Widgets = require("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
//// [privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts]
export declare class publicClassWithWithPrivateParmeterTypes {
    private param1;
    param2: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1;
    static myPublicStaticMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
    private static myPrivateStaticMethod;
    myPublicMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
    private myPrivateMethod;
    constructor(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1, param1?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1, param2?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1);
}
export declare class publicClassWithWithPrivateParmeterTypes1 {
    private param1;
    param2: import("GlobalWidgets").Widget3;
    static myPublicStaticMethod(param?: import("GlobalWidgets").Widget3): void;
    private static myPrivateStaticMethod;
    myPublicMethod(param?: import("GlobalWidgets").Widget3): void;
    private myPrivateMethod;
    constructor(param?: import("GlobalWidgets").Widget3, param1?: import("GlobalWidgets").Widget3, param2?: import("GlobalWidgets").Widget3);
}
export declare function publicFunctionWithPrivateParmeterTypes(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
export declare function publicFunctionWithPrivateParmeterTypes1(param?: import("GlobalWidgets").Widget3): void;
export declare class publicClassWithPrivateModuleParameterTypes {
    private param1;
    param2: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    static myPublicStaticMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
    myPublicMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
    constructor(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2, param1?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2, param2?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2);
}
export declare class publicClassWithPrivateModuleParameterTypes2 {
    private param1;
    param2: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
    static myPublicStaticMethod(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;
    myPublicMethod(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;
    constructor(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4, param1?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4, param2?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4);
}
export declare function publicFunctionWithPrivateModuleParameterTypes(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
export declare function publicFunctionWithPrivateModuleParameterTypes1(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;


//// [DtsFileErrors]


privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(12,20): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(13,48): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(15,35): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(17,32): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(17,74): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(17,116): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(20,80): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(30,20): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(31,48): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(32,35): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(33,32): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(33,98): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(33,164): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts(36,87): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.


==== privacyFunctionCannotNameParameterTypeDeclFile_consumer.d.ts (14 errors) ====
    export declare class publicClassWithWithPrivateParmeterTypes {
        private param1;
        param2: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1;
        static myPublicStaticMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
        private myPrivateMethod;
        constructor(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1, param1?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1, param2?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1);
    }
    export declare class publicClassWithWithPrivateParmeterTypes1 {
        private param1;
        param2: import("GlobalWidgets").Widget3;
                       ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        static myPublicStaticMethod(param?: import("GlobalWidgets").Widget3): void;
                                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private static myPrivateStaticMethod;
        myPublicMethod(param?: import("GlobalWidgets").Widget3): void;
                                      ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private myPrivateMethod;
        constructor(param?: import("GlobalWidgets").Widget3, param1?: import("GlobalWidgets").Widget3, param2?: import("GlobalWidgets").Widget3);
                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
                                                                             ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
                                                                                                                       ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    }
    export declare function publicFunctionWithPrivateParmeterTypes(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").Widget1): void;
    export declare function publicFunctionWithPrivateParmeterTypes1(param?: import("GlobalWidgets").Widget3): void;
                                                                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    export declare class publicClassWithPrivateModuleParameterTypes {
        private param1;
        param2: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2;
        static myPublicStaticMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
        myPublicMethod(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
        constructor(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2, param1?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2, param2?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2);
    }
    export declare class publicClassWithPrivateModuleParameterTypes2 {
        private param1;
        param2: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                       ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        static myPublicStaticMethod(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;
                                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        myPublicMethod(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;
                                      ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        constructor(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4, param1?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4, param2?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4);
                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
                                                                                                     ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
                                                                                                                                                                       ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    }
    export declare function publicFunctionWithPrivateModuleParameterTypes(param?: import("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets").SpecializedWidget.Widget2): void;
    export declare function publicFunctionWithPrivateModuleParameterTypes1(param?: import("GlobalWidgets").SpecializedGlobalWidget.Widget4): void;
                                                                                          ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    
==== privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.d.ts (0 errors) ====
    declare module "GlobalWidgets" {
        class Widget3 {
            name: string;
        }
        function createWidget3(): Widget3;
        namespace SpecializedGlobalWidget {
            class Widget4 {
                name: string;
            }
            function createWidget4(): Widget4;
        }
    }
    
==== privacyFunctionCannotNameParameterTypeDeclFile_Widgets.d.ts (0 errors) ====
    export declare class Widget1 {
        name: string;
    }
    export declare function createWidget1(): Widget1;
    export declare namespace SpecializedWidget {
        class Widget2 {
            name: string;
        }
        function createWidget2(): Widget2;
    }
    
==== privacyFunctionCannotNameParameterTypeDeclFile_exporter.d.ts (0 errors) ====
    import Widgets = require("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
    import Widgets1 = require("GlobalWidgets");
    export declare function createExportedWidget1(): Widgets.Widget1;
    export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
    export declare function createExportedWidget3(): Widgets1.Widget3;
    export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
    
//// [tests/cases/compiler/privacyFunctionCannotNameReturnTypeDeclFile.ts] ////

//// [privacyFunctionReturnTypeDeclFile_GlobalWidgets.ts]
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

//// [privacyFunctionReturnTypeDeclFile_Widgets.ts]
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

//// [privacyFunctionReturnTypeDeclFile_exporter.ts]
///<reference path='privacyFunctionReturnTypeDeclFile_GlobalWidgets.ts'/>
import Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
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

//// [privacyFunctionReturnTypeDeclFile_consumer.ts]
import exporter = require("./privacyFunctionReturnTypeDeclFile_exporter");
export class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod() { // Error
        return exporter.createExportedWidget1();
    }
    private static myPrivateStaticMethod() {
        return exporter.createExportedWidget1();;
    }
    myPublicMethod() { // Error
        return exporter.createExportedWidget1();;
    }
    private myPrivateMethod() {
        return exporter.createExportedWidget1();;
    }
    static myPublicStaticMethod1() { // Error
        return exporter.createExportedWidget3();
    }
    private static myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();;
    }
    myPublicMethod1() { // Error
        return exporter.createExportedWidget3();;
    }
    private myPrivateMethod1() {
        return exporter.createExportedWidget3();;
    }
}

class privateClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod() { 
        return exporter.createExportedWidget1();
    }
    private static myPrivateStaticMethod() {
        return exporter.createExportedWidget1();;
    }
    myPublicMethod() { 
        return exporter.createExportedWidget1();;
    }
    private myPrivateMethod() {
        return exporter.createExportedWidget1();;
    }
    static myPublicStaticMethod1() { 
        return exporter.createExportedWidget3();
    }
    private static myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();;
    }
    myPublicMethod1() { 
        return exporter.createExportedWidget3();;
    }
    private myPrivateMethod1() {
        return exporter.createExportedWidget3();;
    }
}

export function publicFunctionWithPrivateParmeterTypes() { // Error
    return exporter.createExportedWidget1();
}
function privateFunctionWithPrivateParmeterTypes()   {
    return exporter.createExportedWidget1();
}
export function publicFunctionWithPrivateParmeterTypes1() { // Error
    return exporter.createExportedWidget3();
}
function privateFunctionWithPrivateParmeterTypes1() {
    return exporter.createExportedWidget3();
}

export class publicClassWithPrivateModuleReturnTypes {
    static myPublicStaticMethod() { // Error
        return exporter.createExportedWidget2();
    }
    myPublicMethod() { // Error
        return exporter.createExportedWidget2();
    }
    static myPublicStaticMethod1() { // Error
        return exporter.createExportedWidget4();
    }
    myPublicMethod1() { // Error
        return exporter.createExportedWidget4();
    }
}
export function publicFunctionWithPrivateModuleReturnTypes() { // Error
    return exporter.createExportedWidget2();
}
export function publicFunctionWithPrivateModuleReturnTypes1() { // Error
    return exporter.createExportedWidget4();
}

class privateClassWithPrivateModuleReturnTypes {
    static myPublicStaticMethod() { 
        return exporter.createExportedWidget2();
    }
    myPublicMethod() { 
        return exporter.createExportedWidget2();
    }
    static myPublicStaticMethod1() { // Error
        return exporter.createExportedWidget4();
    }
    myPublicMethod1() { // Error
        return exporter.createExportedWidget4();
    }
}
function privateFunctionWithPrivateModuleReturnTypes() { 
    return exporter.createExportedWidget2();
}
function privateFunctionWithPrivateModuleReturnTypes1() {
    return exporter.createExportedWidget4();
}


//// [privacyFunctionReturnTypeDeclFile_GlobalWidgets.js]
//// [privacyFunctionReturnTypeDeclFile_Widgets.js]
"use strict";
exports.__esModule = true;
exports.SpecializedWidget = exports.createWidget1 = exports.Widget1 = void 0;
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
exports.createWidget1 = createWidget1;
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
})(SpecializedWidget = exports.SpecializedWidget || (exports.SpecializedWidget = {}));
//// [privacyFunctionReturnTypeDeclFile_exporter.js]
"use strict";
exports.__esModule = true;
exports.createExportedWidget4 = exports.createExportedWidget3 = exports.createExportedWidget2 = exports.createExportedWidget1 = void 0;
///<reference path='privacyFunctionReturnTypeDeclFile_GlobalWidgets.ts'/>
var Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
var Widgets1 = require("GlobalWidgets");
function createExportedWidget1() {
    return Widgets.createWidget1();
}
exports.createExportedWidget1 = createExportedWidget1;
function createExportedWidget2() {
    return Widgets.SpecializedWidget.createWidget2();
}
exports.createExportedWidget2 = createExportedWidget2;
function createExportedWidget3() {
    return Widgets1.createWidget3();
}
exports.createExportedWidget3 = createExportedWidget3;
function createExportedWidget4() {
    return Widgets1.SpecializedGlobalWidget.createWidget4();
}
exports.createExportedWidget4 = createExportedWidget4;
//// [privacyFunctionReturnTypeDeclFile_consumer.js]
"use strict";
exports.__esModule = true;
exports.publicFunctionWithPrivateModuleReturnTypes1 = exports.publicFunctionWithPrivateModuleReturnTypes = exports.publicClassWithPrivateModuleReturnTypes = exports.publicFunctionWithPrivateParmeterTypes1 = exports.publicFunctionWithPrivateParmeterTypes = exports.publicClassWithWithPrivateParmeterTypes = void 0;
var exporter = require("./privacyFunctionReturnTypeDeclFile_exporter");
var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPrivateParmeterTypes() {
    }
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return exporter.createExportedWidget1();
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return exporter.createExportedWidget3();
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    return publicClassWithWithPrivateParmeterTypes;
}());
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes() {
    }
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return exporter.createExportedWidget1();
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        return exporter.createExportedWidget1();
        ;
    };
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return exporter.createExportedWidget3();
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
        return exporter.createExportedWidget3();
        ;
    };
    return privateClassWithWithPrivateParmeterTypes;
}());
function publicFunctionWithPrivateParmeterTypes() {
    return exporter.createExportedWidget1();
}
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
function privateFunctionWithPrivateParmeterTypes() {
    return exporter.createExportedWidget1();
}
function publicFunctionWithPrivateParmeterTypes1() {
    return exporter.createExportedWidget3();
}
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
function privateFunctionWithPrivateParmeterTypes1() {
    return exporter.createExportedWidget3();
}
var publicClassWithPrivateModuleReturnTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleReturnTypes() {
    }
    publicClassWithPrivateModuleReturnTypes.myPublicStaticMethod = function () {
        return exporter.createExportedWidget2();
    };
    publicClassWithPrivateModuleReturnTypes.prototype.myPublicMethod = function () {
        return exporter.createExportedWidget2();
    };
    publicClassWithPrivateModuleReturnTypes.myPublicStaticMethod1 = function () {
        return exporter.createExportedWidget4();
    };
    publicClassWithPrivateModuleReturnTypes.prototype.myPublicMethod1 = function () {
        return exporter.createExportedWidget4();
    };
    return publicClassWithPrivateModuleReturnTypes;
}());
exports.publicClassWithPrivateModuleReturnTypes = publicClassWithPrivateModuleReturnTypes;
function publicFunctionWithPrivateModuleReturnTypes() {
    return exporter.createExportedWidget2();
}
exports.publicFunctionWithPrivateModuleReturnTypes = publicFunctionWithPrivateModuleReturnTypes;
function publicFunctionWithPrivateModuleReturnTypes1() {
    return exporter.createExportedWidget4();
}
exports.publicFunctionWithPrivateModuleReturnTypes1 = publicFunctionWithPrivateModuleReturnTypes1;
var privateClassWithPrivateModuleReturnTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleReturnTypes() {
    }
    privateClassWithPrivateModuleReturnTypes.myPublicStaticMethod = function () {
        return exporter.createExportedWidget2();
    };
    privateClassWithPrivateModuleReturnTypes.prototype.myPublicMethod = function () {
        return exporter.createExportedWidget2();
    };
    privateClassWithPrivateModuleReturnTypes.myPublicStaticMethod1 = function () {
        return exporter.createExportedWidget4();
    };
    privateClassWithPrivateModuleReturnTypes.prototype.myPublicMethod1 = function () {
        return exporter.createExportedWidget4();
    };
    return privateClassWithPrivateModuleReturnTypes;
}());
function privateFunctionWithPrivateModuleReturnTypes() {
    return exporter.createExportedWidget2();
}
function privateFunctionWithPrivateModuleReturnTypes1() {
    return exporter.createExportedWidget4();
}


//// [privacyFunctionReturnTypeDeclFile_GlobalWidgets.d.ts]
declare module "GlobalWidgets" {
    class Widget3 {
        name: string;
    }
    function createWidget3(): Widget3;
    module SpecializedGlobalWidget {
        class Widget4 {
            name: string;
        }
        function createWidget4(): Widget4;
    }
}
//// [privacyFunctionReturnTypeDeclFile_Widgets.d.ts]
export declare class Widget1 {
    name: string;
}
export declare function createWidget1(): Widget1;
export declare module SpecializedWidget {
    class Widget2 {
        name: string;
    }
    function createWidget2(): Widget2;
}
//// [privacyFunctionReturnTypeDeclFile_exporter.d.ts]
/// <reference path="privacyFunctionReturnTypeDeclFile_GlobalWidgets.d.ts" />
import Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
//// [privacyFunctionReturnTypeDeclFile_consumer.d.ts]
/// <reference path="privacyFunctionReturnTypeDeclFile_GlobalWidgets.d.ts" />
export declare class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
    private static myPrivateStaticMethod;
    myPublicMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
    private myPrivateMethod;
    static myPublicStaticMethod1(): import("GlobalWidgets").Widget3;
    private static myPrivateStaticMethod1;
    myPublicMethod1(): import("GlobalWidgets").Widget3;
    private myPrivateMethod1;
}
export declare function publicFunctionWithPrivateParmeterTypes(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
export declare function publicFunctionWithPrivateParmeterTypes1(): import("GlobalWidgets").Widget3;
export declare class publicClassWithPrivateModuleReturnTypes {
    static myPublicStaticMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    myPublicMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    static myPublicStaticMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
    myPublicMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
}
export declare function publicFunctionWithPrivateModuleReturnTypes(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
export declare function publicFunctionWithPrivateModuleReturnTypes1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;

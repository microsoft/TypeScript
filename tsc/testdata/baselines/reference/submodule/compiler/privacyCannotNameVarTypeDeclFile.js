//// [tests/cases/compiler/privacyCannotNameVarTypeDeclFile.ts] ////

//// [privacyCannotNameVarTypeDeclFile_GlobalWidgets.ts]
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

//// [privacyCannotNameVarTypeDeclFile_Widgets.ts]
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

//// [privacyCannotNameVarTypeDeclFile_exporter.ts]
///<reference path='privacyCannotNameVarTypeDeclFile_GlobalWidgets.ts'/>
import Widgets = require("./privacyCannotNameVarTypeDeclFile_Widgets");
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

//// [privacyCannotNameVarTypeDeclFile_consumer.ts]
import exporter = require("./privacyCannotNameVarTypeDeclFile_exporter");
export class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget1(); // Error
    private static myPrivateStaticProperty = exporter.createExportedWidget1();
    myPublicProperty = exporter.createExportedWidget1(); // Error
    private myPrivateProperty = exporter.createExportedWidget1();

    static myPublicStaticProperty1 = exporter.createExportedWidget3(); // Error
    private static myPrivateStaticProperty1 = exporter.createExportedWidget3();
    myPublicProperty1 = exporter.createExportedWidget3(); // Error
    private myPrivateProperty1 = exporter.createExportedWidget3();
}

class privateClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget1(); 
    private static myPrivateStaticProperty = exporter.createExportedWidget1();
    myPublicProperty = exporter.createExportedWidget1(); 
    private myPrivateProperty = exporter.createExportedWidget1();

    static myPublicStaticProperty1 = exporter.createExportedWidget3(); 
    private static myPrivateStaticProperty1 = exporter.createExportedWidget3();
    myPublicProperty1 = exporter.createExportedWidget3(); 
    private myPrivateProperty1 = exporter.createExportedWidget3();
}

export var publicVarWithPrivatePropertyTypes= exporter.createExportedWidget1(); // Error
var privateVarWithPrivatePropertyTypes= exporter.createExportedWidget1();
export var publicVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3(); // Error
var privateVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3();

export class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty= exporter.createExportedWidget2(); // Error
    myPublicProperty = exporter.createExportedWidget2(); // Error
    static myPublicStaticProperty1 = exporter.createExportedWidget4(); // Error
    myPublicProperty1 = exporter.createExportedWidget4(); // Error
}
export var publicVarWithPrivateModulePropertyTypes= exporter.createExportedWidget2(); // Error
export var publicVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4(); // Error

class privateClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty= exporter.createExportedWidget2();
    myPublicProperty= exporter.createExportedWidget2();
    static myPublicStaticProperty1 = exporter.createExportedWidget4();
    myPublicProperty1 = exporter.createExportedWidget4();
}
var privateVarWithPrivateModulePropertyTypes= exporter.createExportedWidget2();
var privateVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4();

//// [privacyCannotNameVarTypeDeclFile_GlobalWidgets.js]
//// [privacyCannotNameVarTypeDeclFile_Widgets.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializedWidget = exports.Widget1 = void 0;
exports.createWidget1 = createWidget1;
class Widget1 {
    name = 'one';
}
exports.Widget1 = Widget1;
function createWidget1() {
    return new Widget1();
}
var SpecializedWidget;
(function (SpecializedWidget) {
    class Widget2 {
        name = 'one';
    }
    SpecializedWidget.Widget2 = Widget2;
    function createWidget2() {
        return new Widget2();
    }
    SpecializedWidget.createWidget2 = createWidget2;
})(SpecializedWidget || (exports.SpecializedWidget = SpecializedWidget = {}));
//// [privacyCannotNameVarTypeDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
const Widgets = require("./privacyCannotNameVarTypeDeclFile_Widgets");
const Widgets1 = require("GlobalWidgets");
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
//// [privacyCannotNameVarTypeDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicVarWithPrivateModulePropertyTypes1 = exports.publicVarWithPrivateModulePropertyTypes = exports.publicClassWithPrivateModulePropertyTypes = exports.publicVarWithPrivatePropertyTypes1 = exports.publicVarWithPrivatePropertyTypes = exports.publicClassWithWithPrivatePropertyTypes = void 0;
const exporter = require("./privacyCannotNameVarTypeDeclFile_exporter");
class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget1();
    static myPrivateStaticProperty = exporter.createExportedWidget1();
    myPublicProperty = exporter.createExportedWidget1();
    myPrivateProperty = exporter.createExportedWidget1();
    static myPublicStaticProperty1 = exporter.createExportedWidget3();
    static myPrivateStaticProperty1 = exporter.createExportedWidget3();
    myPublicProperty1 = exporter.createExportedWidget3();
    myPrivateProperty1 = exporter.createExportedWidget3();
}
exports.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
class privateClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget1();
    static myPrivateStaticProperty = exporter.createExportedWidget1();
    myPublicProperty = exporter.createExportedWidget1();
    myPrivateProperty = exporter.createExportedWidget1();
    static myPublicStaticProperty1 = exporter.createExportedWidget3();
    static myPrivateStaticProperty1 = exporter.createExportedWidget3();
    myPublicProperty1 = exporter.createExportedWidget3();
    myPrivateProperty1 = exporter.createExportedWidget3();
}
exports.publicVarWithPrivatePropertyTypes = exporter.createExportedWidget1();
var privateVarWithPrivatePropertyTypes = exporter.createExportedWidget1();
exports.publicVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3();
var privateVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3();
class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget2();
    myPublicProperty = exporter.createExportedWidget2();
    static myPublicStaticProperty1 = exporter.createExportedWidget4();
    myPublicProperty1 = exporter.createExportedWidget4();
}
exports.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
exports.publicVarWithPrivateModulePropertyTypes = exporter.createExportedWidget2();
exports.publicVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4();
class privateClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty = exporter.createExportedWidget2();
    myPublicProperty = exporter.createExportedWidget2();
    static myPublicStaticProperty1 = exporter.createExportedWidget4();
    myPublicProperty1 = exporter.createExportedWidget4();
}
var privateVarWithPrivateModulePropertyTypes = exporter.createExportedWidget2();
var privateVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4();

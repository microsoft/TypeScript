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
//// [privacyFunctionReturnTypeDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
///<reference path='privacyFunctionReturnTypeDeclFile_GlobalWidgets.ts'/>
const Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
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
//// [privacyFunctionReturnTypeDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithPrivateModuleReturnTypes = exports.publicClassWithWithPrivateParmeterTypes = void 0;
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
exports.publicFunctionWithPrivateModuleReturnTypes = publicFunctionWithPrivateModuleReturnTypes;
exports.publicFunctionWithPrivateModuleReturnTypes1 = publicFunctionWithPrivateModuleReturnTypes1;
const exporter = require("./privacyFunctionReturnTypeDeclFile_exporter");
class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod() {
        return exporter.createExportedWidget1();
    }
    static myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    myPublicMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    myPrivateMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    static myPublicStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    static myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
    myPublicMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
    myPrivateMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
}
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
class privateClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod() {
        return exporter.createExportedWidget1();
    }
    static myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    myPublicMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    myPrivateMethod() {
        return exporter.createExportedWidget1();
        ;
    }
    static myPublicStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    static myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
    myPublicMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
    myPrivateMethod1() {
        return exporter.createExportedWidget3();
        ;
    }
}
function publicFunctionWithPrivateParmeterTypes() {
    return exporter.createExportedWidget1();
}
function privateFunctionWithPrivateParmeterTypes() {
    return exporter.createExportedWidget1();
}
function publicFunctionWithPrivateParmeterTypes1() {
    return exporter.createExportedWidget3();
}
function privateFunctionWithPrivateParmeterTypes1() {
    return exporter.createExportedWidget3();
}
class publicClassWithPrivateModuleReturnTypes {
    static myPublicStaticMethod() {
        return exporter.createExportedWidget2();
    }
    myPublicMethod() {
        return exporter.createExportedWidget2();
    }
    static myPublicStaticMethod1() {
        return exporter.createExportedWidget4();
    }
    myPublicMethod1() {
        return exporter.createExportedWidget4();
    }
}
exports.publicClassWithPrivateModuleReturnTypes = publicClassWithPrivateModuleReturnTypes;
function publicFunctionWithPrivateModuleReturnTypes() {
    return exporter.createExportedWidget2();
}
function publicFunctionWithPrivateModuleReturnTypes1() {
    return exporter.createExportedWidget4();
}
class privateClassWithPrivateModuleReturnTypes {
    static myPublicStaticMethod() {
        return exporter.createExportedWidget2();
    }
    myPublicMethod() {
        return exporter.createExportedWidget2();
    }
    static myPublicStaticMethod1() {
        return exporter.createExportedWidget4();
    }
    myPublicMethod1() {
        return exporter.createExportedWidget4();
    }
}
function privateFunctionWithPrivateModuleReturnTypes() {
    return exporter.createExportedWidget2();
}
function privateFunctionWithPrivateModuleReturnTypes1() {
    return exporter.createExportedWidget4();
}

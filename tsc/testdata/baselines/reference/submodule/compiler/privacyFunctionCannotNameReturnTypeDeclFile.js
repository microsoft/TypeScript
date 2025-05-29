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


//// [privacyFunctionReturnTypeDeclFile_GlobalWidgets.d.ts]
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
//// [privacyFunctionReturnTypeDeclFile_Widgets.d.ts]
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
//// [privacyFunctionReturnTypeDeclFile_exporter.d.ts]
import Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
//// [privacyFunctionReturnTypeDeclFile_consumer.d.ts]
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


//// [DtsFileErrors]


privacyFunctionReturnTypeDeclFile_consumer.d.ts(6,44): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionReturnTypeDeclFile_consumer.d.ts(8,31): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionReturnTypeDeclFile_consumer.d.ts(12,75): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionReturnTypeDeclFile_consumer.d.ts(16,44): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionReturnTypeDeclFile_consumer.d.ts(17,31): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyFunctionReturnTypeDeclFile_consumer.d.ts(20,79): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.


==== privacyFunctionReturnTypeDeclFile_consumer.d.ts (6 errors) ====
    export declare class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
        private static myPrivateStaticMethod;
        myPublicMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
        private myPrivateMethod;
        static myPublicStaticMethod1(): import("GlobalWidgets").Widget3;
                                               ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private static myPrivateStaticMethod1;
        myPublicMethod1(): import("GlobalWidgets").Widget3;
                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private myPrivateMethod1;
    }
    export declare function publicFunctionWithPrivateParmeterTypes(): import("./privacyFunctionReturnTypeDeclFile_Widgets").Widget1;
    export declare function publicFunctionWithPrivateParmeterTypes1(): import("GlobalWidgets").Widget3;
                                                                              ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    export declare class publicClassWithPrivateModuleReturnTypes {
        static myPublicStaticMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
        myPublicMethod(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
        static myPublicStaticMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                               ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        myPublicMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    }
    export declare function publicFunctionWithPrivateModuleReturnTypes(): import("./privacyFunctionReturnTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    export declare function publicFunctionWithPrivateModuleReturnTypes1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                                                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    
==== privacyFunctionReturnTypeDeclFile_GlobalWidgets.d.ts (0 errors) ====
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
    
==== privacyFunctionReturnTypeDeclFile_Widgets.d.ts (0 errors) ====
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
    
==== privacyFunctionReturnTypeDeclFile_exporter.d.ts (0 errors) ====
    import Widgets = require("./privacyFunctionReturnTypeDeclFile_Widgets");
    import Widgets1 = require("GlobalWidgets");
    export declare function createExportedWidget1(): Widgets.Widget1;
    export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
    export declare function createExportedWidget3(): Widgets1.Widget3;
    export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
    
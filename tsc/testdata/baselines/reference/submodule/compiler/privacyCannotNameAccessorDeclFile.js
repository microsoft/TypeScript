//// [tests/cases/compiler/privacyCannotNameAccessorDeclFile.ts] ////

//// [privacyCannotNameAccessorDeclFile_GlobalWidgets.ts]
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

//// [privacyCannotNameAccessorDeclFile_Widgets.ts]
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

//// [privacyCannotNameAccessorDeclFile_exporter.ts]
///<reference path='privacyCannotNameAccessorDeclFile_GlobalWidgets.ts'/>
import Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
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

//// [privacyCannotNameAccessorDeclFile_consumer.ts]
import exporter = require("./privacyCannotNameAccessorDeclFile_exporter");
export class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() { // Error
        return exporter.createExportedWidget1();
    }
    private static get myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
    }
    get myPublicMethod() { // Error
        return exporter.createExportedWidget1();
    }
    private get myPrivateMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPublicStaticMethod1() { // Error
        return exporter.createExportedWidget3();
    }
    private static get myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPublicMethod1() { // Error
        return exporter.createExportedWidget3();
    }
    private get myPrivateMethod1() {
        return exporter.createExportedWidget3();
    }
}

class privateClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() { 
        return exporter.createExportedWidget1();
    }
    private static get myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
    }
    get myPublicMethod() { 
        return exporter.createExportedWidget1();
    }
    private get myPrivateMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPublicStaticMethod1() { 
        return exporter.createExportedWidget3();
    }
    private static get myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPublicMethod1() { 
        return exporter.createExportedWidget3();
    }
    private get myPrivateMethod1() {
        return exporter.createExportedWidget3();
    }
}

export class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() { // Error
        return exporter.createExportedWidget2();
    }
    get myPublicMethod() { // Error
        return exporter.createExportedWidget2();
    }
    static get myPublicStaticMethod1() { // Error
        return exporter.createExportedWidget4();
    }
    get myPublicMethod1() { // Error
        return exporter.createExportedWidget4();
    }
}

class privateClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() { 
        return exporter.createExportedWidget2();
    }
    get myPublicMethod() { 
        return exporter.createExportedWidget2();
    }
    static get myPublicStaticMethod1() { 
        return exporter.createExportedWidget4();
    }
    get myPublicMethod1() { 
        return exporter.createExportedWidget4();
    }
}

//// [privacyCannotNameAccessorDeclFile_GlobalWidgets.js]
//// [privacyCannotNameAccessorDeclFile_Widgets.js]
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
//// [privacyCannotNameAccessorDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
///<reference path='privacyCannotNameAccessorDeclFile_GlobalWidgets.ts'/>
const Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
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
//// [privacyCannotNameAccessorDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithPrivateModuleGetAccessorTypes = exports.publicClassWithWithPrivateGetAccessorTypes = void 0;
const exporter = require("./privacyCannotNameAccessorDeclFile_exporter");
class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
    }
    get myPublicMethod() {
        return exporter.createExportedWidget1();
    }
    get myPrivateMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPublicStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    static get myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPublicMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPrivateMethod1() {
        return exporter.createExportedWidget3();
    }
}
exports.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
class privateClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPrivateStaticMethod() {
        return exporter.createExportedWidget1();
    }
    get myPublicMethod() {
        return exporter.createExportedWidget1();
    }
    get myPrivateMethod() {
        return exporter.createExportedWidget1();
    }
    static get myPublicStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    static get myPrivateStaticMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPublicMethod1() {
        return exporter.createExportedWidget3();
    }
    get myPrivateMethod1() {
        return exporter.createExportedWidget3();
    }
}
class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() {
        return exporter.createExportedWidget2();
    }
    get myPublicMethod() {
        return exporter.createExportedWidget2();
    }
    static get myPublicStaticMethod1() {
        return exporter.createExportedWidget4();
    }
    get myPublicMethod1() {
        return exporter.createExportedWidget4();
    }
}
exports.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
class privateClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() {
        return exporter.createExportedWidget2();
    }
    get myPublicMethod() {
        return exporter.createExportedWidget2();
    }
    static get myPublicStaticMethod1() {
        return exporter.createExportedWidget4();
    }
    get myPublicMethod1() {
        return exporter.createExportedWidget4();
    }
}


//// [privacyCannotNameAccessorDeclFile_GlobalWidgets.d.ts]
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
//// [privacyCannotNameAccessorDeclFile_Widgets.d.ts]
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
//// [privacyCannotNameAccessorDeclFile_exporter.d.ts]
import Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
//// [privacyCannotNameAccessorDeclFile_consumer.d.ts]
export declare class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").Widget1;
    private static get myPrivateStaticMethod();
    get myPublicMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").Widget1;
    private get myPrivateMethod();
    static get myPublicStaticMethod1(): import("GlobalWidgets").Widget3;
    private static get myPrivateStaticMethod1();
    get myPublicMethod1(): import("GlobalWidgets").Widget3;
    private get myPrivateMethod1();
}
export declare class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").SpecializedWidget.Widget2;
    get myPublicMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").SpecializedWidget.Widget2;
    static get myPublicStaticMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
    get myPublicMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
}


//// [DtsFileErrors]


privacyCannotNameAccessorDeclFile_consumer.d.ts(6,48): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameAccessorDeclFile_consumer.d.ts(8,35): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameAccessorDeclFile_consumer.d.ts(14,48): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameAccessorDeclFile_consumer.d.ts(15,35): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.


==== privacyCannotNameAccessorDeclFile_consumer.d.ts (4 errors) ====
    export declare class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").Widget1;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").Widget1;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): import("GlobalWidgets").Widget3;
                                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): import("GlobalWidgets").Widget3;
                                      ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private get myPrivateMethod1();
    }
    export declare class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").SpecializedWidget.Widget2;
        get myPublicMethod(): import("./privacyCannotNameAccessorDeclFile_Widgets").SpecializedWidget.Widget2;
        static get myPublicStaticMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                                   ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        get myPublicMethod1(): import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                      ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    }
    
==== privacyCannotNameAccessorDeclFile_GlobalWidgets.d.ts (0 errors) ====
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
    
==== privacyCannotNameAccessorDeclFile_Widgets.d.ts (0 errors) ====
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
    
==== privacyCannotNameAccessorDeclFile_exporter.d.ts (0 errors) ====
    import Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
    import Widgets1 = require("GlobalWidgets");
    export declare function createExportedWidget1(): Widgets.Widget1;
    export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
    export declare function createExportedWidget3(): Widgets1.Widget3;
    export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
    
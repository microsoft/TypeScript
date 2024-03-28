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
//// [privacyCannotNameVarTypeDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
///<reference path='privacyCannotNameVarTypeDeclFile_GlobalWidgets.ts'/>
var Widgets = require("./privacyCannotNameVarTypeDeclFile_Widgets");
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
//// [privacyCannotNameVarTypeDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicVarWithPrivateModulePropertyTypes1 = exports.publicVarWithPrivateModulePropertyTypes = exports.publicClassWithPrivateModulePropertyTypes = exports.publicVarWithPrivatePropertyTypes1 = exports.publicVarWithPrivatePropertyTypes = exports.publicClassWithWithPrivatePropertyTypes = void 0;
var exporter = require("./privacyCannotNameVarTypeDeclFile_exporter");
var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
    function publicClassWithWithPrivatePropertyTypes() {
        this.myPublicProperty = exporter.createExportedWidget1(); // Error
        this.myPrivateProperty = exporter.createExportedWidget1();
        this.myPublicProperty1 = exporter.createExportedWidget3(); // Error
        this.myPrivateProperty1 = exporter.createExportedWidget3();
    }
    publicClassWithWithPrivatePropertyTypes.myPublicStaticProperty = exporter.createExportedWidget1(); // Error
    publicClassWithWithPrivatePropertyTypes.myPrivateStaticProperty = exporter.createExportedWidget1();
    publicClassWithWithPrivatePropertyTypes.myPublicStaticProperty1 = exporter.createExportedWidget3(); // Error
    publicClassWithWithPrivatePropertyTypes.myPrivateStaticProperty1 = exporter.createExportedWidget3();
    return publicClassWithWithPrivatePropertyTypes;
}());
exports.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
    function privateClassWithWithPrivatePropertyTypes() {
        this.myPublicProperty = exporter.createExportedWidget1();
        this.myPrivateProperty = exporter.createExportedWidget1();
        this.myPublicProperty1 = exporter.createExportedWidget3();
        this.myPrivateProperty1 = exporter.createExportedWidget3();
    }
    privateClassWithWithPrivatePropertyTypes.myPublicStaticProperty = exporter.createExportedWidget1();
    privateClassWithWithPrivatePropertyTypes.myPrivateStaticProperty = exporter.createExportedWidget1();
    privateClassWithWithPrivatePropertyTypes.myPublicStaticProperty1 = exporter.createExportedWidget3();
    privateClassWithWithPrivatePropertyTypes.myPrivateStaticProperty1 = exporter.createExportedWidget3();
    return privateClassWithWithPrivatePropertyTypes;
}());
exports.publicVarWithPrivatePropertyTypes = exporter.createExportedWidget1(); // Error
var privateVarWithPrivatePropertyTypes = exporter.createExportedWidget1();
exports.publicVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3(); // Error
var privateVarWithPrivatePropertyTypes1 = exporter.createExportedWidget3();
var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
    function publicClassWithPrivateModulePropertyTypes() {
        this.myPublicProperty = exporter.createExportedWidget2(); // Error
        this.myPublicProperty1 = exporter.createExportedWidget4(); // Error
    }
    publicClassWithPrivateModulePropertyTypes.myPublicStaticProperty = exporter.createExportedWidget2(); // Error
    publicClassWithPrivateModulePropertyTypes.myPublicStaticProperty1 = exporter.createExportedWidget4(); // Error
    return publicClassWithPrivateModulePropertyTypes;
}());
exports.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
exports.publicVarWithPrivateModulePropertyTypes = exporter.createExportedWidget2(); // Error
exports.publicVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4(); // Error
var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
    function privateClassWithPrivateModulePropertyTypes() {
        this.myPublicProperty = exporter.createExportedWidget2();
        this.myPublicProperty1 = exporter.createExportedWidget4();
    }
    privateClassWithPrivateModulePropertyTypes.myPublicStaticProperty = exporter.createExportedWidget2();
    privateClassWithPrivateModulePropertyTypes.myPublicStaticProperty1 = exporter.createExportedWidget4();
    return privateClassWithPrivateModulePropertyTypes;
}());
var privateVarWithPrivateModulePropertyTypes = exporter.createExportedWidget2();
var privateVarWithPrivateModulePropertyTypes1 = exporter.createExportedWidget4();


//// [privacyCannotNameVarTypeDeclFile_GlobalWidgets.d.ts]
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
//// [privacyCannotNameVarTypeDeclFile_Widgets.d.ts]
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
//// [privacyCannotNameVarTypeDeclFile_exporter.d.ts]
import Widgets = require("./privacyCannotNameVarTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
//// [privacyCannotNameVarTypeDeclFile_consumer.d.ts]
export declare class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
    private static myPrivateStaticProperty;
    myPublicProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
    private myPrivateProperty;
    static myPublicStaticProperty1: import("GlobalWidgets").Widget3;
    private static myPrivateStaticProperty1;
    myPublicProperty1: import("GlobalWidgets").Widget3;
    private myPrivateProperty1;
}
export declare var publicVarWithPrivatePropertyTypes: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
export declare var publicVarWithPrivatePropertyTypes1: import("GlobalWidgets").Widget3;
export declare class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    myPublicProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    static myPublicStaticProperty1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
    myPublicProperty1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
}
export declare var publicVarWithPrivateModulePropertyTypes: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
export declare var publicVarWithPrivateModulePropertyTypes1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;


//// [DtsFileErrors]


privacyCannotNameVarTypeDeclFile_consumer.d.ts(6,44): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameVarTypeDeclFile_consumer.d.ts(8,31): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameVarTypeDeclFile_consumer.d.ts(12,63): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameVarTypeDeclFile_consumer.d.ts(16,44): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameVarTypeDeclFile_consumer.d.ts(17,31): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
privacyCannotNameVarTypeDeclFile_consumer.d.ts(20,69): error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.


==== privacyCannotNameVarTypeDeclFile_consumer.d.ts (6 errors) ====
    export declare class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
        private static myPrivateStaticProperty;
        myPublicProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
        private myPrivateProperty;
        static myPublicStaticProperty1: import("GlobalWidgets").Widget3;
                                               ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private static myPrivateStaticProperty1;
        myPublicProperty1: import("GlobalWidgets").Widget3;
                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        private myPrivateProperty1;
    }
    export declare var publicVarWithPrivatePropertyTypes: import("./privacyCannotNameVarTypeDeclFile_Widgets").Widget1;
    export declare var publicVarWithPrivatePropertyTypes1: import("GlobalWidgets").Widget3;
                                                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    export declare class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
        myPublicProperty: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
        static myPublicStaticProperty1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                               ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
        myPublicProperty1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                  ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    }
    export declare var publicVarWithPrivateModulePropertyTypes: import("./privacyCannotNameVarTypeDeclFile_Widgets").SpecializedWidget.Widget2;
    export declare var publicVarWithPrivateModulePropertyTypes1: import("GlobalWidgets").SpecializedGlobalWidget.Widget4;
                                                                        ~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'GlobalWidgets' or its corresponding type declarations.
    
==== privacyCannotNameVarTypeDeclFile_GlobalWidgets.d.ts (0 errors) ====
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
    
==== privacyCannotNameVarTypeDeclFile_Widgets.d.ts (0 errors) ====
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
    
==== privacyCannotNameVarTypeDeclFile_exporter.d.ts (0 errors) ====
    import Widgets = require("./privacyCannotNameVarTypeDeclFile_Widgets");
    import Widgets1 = require("GlobalWidgets");
    export declare function createExportedWidget1(): Widgets.Widget1;
    export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
    export declare function createExportedWidget3(): Widgets1.Widget3;
    export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;
    
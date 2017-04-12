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
var Widget1 = (function () {
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
    var Widget2 = (function () {
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
//// [privacyCannotNameAccessorDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='privacyCannotNameAccessorDeclFile_GlobalWidgets.ts'/>
var Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
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
//// [privacyCannotNameAccessorDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exporter = require("./privacyCannotNameAccessorDeclFile_exporter");
var publicClassWithWithPrivateGetAccessorTypes = (function () {
    function publicClassWithWithPrivateGetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithWithPrivateGetAccessorTypes;
}());
exports.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
var privateClassWithWithPrivateGetAccessorTypes = (function () {
    function privateClassWithWithPrivateGetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
        get: function () {
            return exporter.createExportedWidget1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
        get: function () {
            return exporter.createExportedWidget3();
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithWithPrivateGetAccessorTypes;
}());
var publicClassWithPrivateModuleGetAccessorTypes = (function () {
    function publicClassWithPrivateModuleGetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return exporter.createExportedWidget2();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return exporter.createExportedWidget2();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget4();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return exporter.createExportedWidget4();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithPrivateModuleGetAccessorTypes;
}());
exports.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
var privateClassWithPrivateModuleGetAccessorTypes = (function () {
    function privateClassWithPrivateModuleGetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return exporter.createExportedWidget2();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return exporter.createExportedWidget2();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return exporter.createExportedWidget4();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return exporter.createExportedWidget4();
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithPrivateModuleGetAccessorTypes;
}());


//// [privacyCannotNameAccessorDeclFile_GlobalWidgets.d.ts]
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
//// [privacyCannotNameAccessorDeclFile_Widgets.d.ts]
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
//// [privacyCannotNameAccessorDeclFile_exporter.d.ts]
/// <reference path="privacyCannotNameAccessorDeclFile_GlobalWidgets.d.ts" />
import Widgets = require("./privacyCannotNameAccessorDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;

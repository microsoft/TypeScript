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
import Widgets = require("privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
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
import exporter = require("privacyFunctionCannotNameParameterTypeDeclFile_exporter");
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
var Widget1 = (function () {
    function Widget1() {
        this.name = 'one';
    }
    return Widget1;
})();
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
    })();
    SpecializedWidget.Widget2 = Widget2;
    function createWidget2() {
        return new Widget2();
    }
    SpecializedWidget.createWidget2 = createWidget2;
})(SpecializedWidget = exports.SpecializedWidget || (exports.SpecializedWidget = {}));
//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.js]
///<reference path='privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.ts'/>
var Widgets = require("privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
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
//// [privacyFunctionCannotNameParameterTypeDeclFile_consumer.js]
var exporter = require("privacyFunctionCannotNameParameterTypeDeclFile_exporter");
var publicClassWithWithPrivateParmeterTypes = (function () {
    function publicClassWithWithPrivateParmeterTypes() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget1() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget1() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    return publicClassWithWithPrivateParmeterTypes;
})();
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var publicClassWithWithPrivateParmeterTypes1 = (function () {
    function publicClassWithWithPrivateParmeterTypes1() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget3() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget3() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParmeterTypes1.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes1.myPrivateStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes1.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    publicClassWithWithPrivateParmeterTypes1.prototype.myPrivateMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    return publicClassWithWithPrivateParmeterTypes1;
})();
exports.publicClassWithWithPrivateParmeterTypes1 = publicClassWithWithPrivateParmeterTypes1;
var privateClassWithWithPrivateParmeterTypes = (function () {
    function privateClassWithWithPrivateParmeterTypes() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget1() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget1() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
    };
    return privateClassWithWithPrivateParmeterTypes;
})();
var privateClassWithWithPrivateParmeterTypes2 = (function () {
    function privateClassWithWithPrivateParmeterTypes2() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget3() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget3() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParmeterTypes2.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes2.myPrivateStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes2.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    privateClassWithWithPrivateParmeterTypes2.prototype.myPrivateMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
    };
    return privateClassWithWithPrivateParmeterTypes2;
})();
function publicFunctionWithPrivateParmeterTypes() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
}
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
function privateFunctionWithPrivateParmeterTypes() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget1() : arguments[0];
}
function publicFunctionWithPrivateParmeterTypes1() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
}
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
function privateFunctionWithPrivateParmeterTypes1() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget3() : arguments[0];
}
var publicClassWithPrivateModuleParameterTypes = (function () {
    function publicClassWithPrivateModuleParameterTypes() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget2() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget2() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
    };
    publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
    };
    return publicClassWithPrivateModuleParameterTypes;
})();
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
var publicClassWithPrivateModuleParameterTypes2 = (function () {
    function publicClassWithPrivateModuleParameterTypes2() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget4() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget4() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithPrivateModuleParameterTypes2.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
    };
    publicClassWithPrivateModuleParameterTypes2.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
    };
    return publicClassWithPrivateModuleParameterTypes2;
})();
exports.publicClassWithPrivateModuleParameterTypes2 = publicClassWithPrivateModuleParameterTypes2;
function publicFunctionWithPrivateModuleParameterTypes() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
}
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
function publicFunctionWithPrivateModuleParameterTypes1() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
}
exports.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
var privateClassWithPrivateModuleParameterTypes = (function () {
    function privateClassWithPrivateModuleParameterTypes() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget2() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget2() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
    };
    privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
    };
    return privateClassWithPrivateModuleParameterTypes;
})();
var privateClassWithPrivateModuleParameterTypes1 = (function () {
    function privateClassWithPrivateModuleParameterTypes1() {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
        var param1 = (arguments[1] === void 0) ? exporter.createExportedWidget4() : arguments[1];
        var param2 = (arguments[2] === void 0) ? exporter.createExportedWidget4() : arguments[2];
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithPrivateModuleParameterTypes1.myPublicStaticMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
    };
    privateClassWithPrivateModuleParameterTypes1.prototype.myPublicMethod = function () {
        var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
    };
    return privateClassWithPrivateModuleParameterTypes1;
})();
function privateFunctionWithPrivateModuleParameterTypes() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget2() : arguments[0];
}
function privateFunctionWithPrivateModuleParameterTypes1() {
    var param = (arguments[0] === void 0) ? exporter.createExportedWidget4() : arguments[0];
}


//// [privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.d.ts]
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
//// [privacyFunctionCannotNameParameterTypeDeclFile_Widgets.d.ts]
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
//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.d.ts]
/// <reference path="privacyFunctionCannotNameParameterTypeDeclFile_GlobalWidgets.d.ts" />
import Widgets = require("privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
import Widgets1 = require("GlobalWidgets");
export declare function createExportedWidget1(): Widgets.Widget1;
export declare function createExportedWidget2(): Widgets.SpecializedWidget.Widget2;
export declare function createExportedWidget3(): Widgets1.Widget3;
export declare function createExportedWidget4(): Widgets1.SpecializedGlobalWidget.Widget4;

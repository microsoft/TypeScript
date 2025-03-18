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
//// [privacyFunctionCannotNameParameterTypeDeclFile_exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportedWidget1 = createExportedWidget1;
exports.createExportedWidget2 = createExportedWidget2;
exports.createExportedWidget3 = createExportedWidget3;
exports.createExportedWidget4 = createExportedWidget4;
const Widgets = require("./privacyFunctionCannotNameParameterTypeDeclFile_Widgets");
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
//// [privacyFunctionCannotNameParameterTypeDeclFile_consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithPrivateModuleParameterTypes2 = exports.publicClassWithPrivateModuleParameterTypes = exports.publicClassWithWithPrivateParmeterTypes1 = exports.publicClassWithWithPrivateParmeterTypes = void 0;
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
exports.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
const exporter = require("./privacyFunctionCannotNameParameterTypeDeclFile_exporter");
class publicClassWithWithPrivateParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget1()) {
    }
    static myPrivateStaticMethod(param = exporter.createExportedWidget1()) {
    }
    myPublicMethod(param = exporter.createExportedWidget1()) {
    }
    myPrivateMethod(param = exporter.createExportedWidget1()) {
    }
    constructor(param = exporter.createExportedWidget1(), param1 = exporter.createExportedWidget1(), param2 = exporter.createExportedWidget1()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
class publicClassWithWithPrivateParmeterTypes1 {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget3()) {
    }
    static myPrivateStaticMethod(param = exporter.createExportedWidget3()) {
    }
    myPublicMethod(param = exporter.createExportedWidget3()) {
    }
    myPrivateMethod(param = exporter.createExportedWidget3()) {
    }
    constructor(param = exporter.createExportedWidget3(), param1 = exporter.createExportedWidget3(), param2 = exporter.createExportedWidget3()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithWithPrivateParmeterTypes1 = publicClassWithWithPrivateParmeterTypes1;
class privateClassWithWithPrivateParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget1()) {
    }
    static myPrivateStaticMethod(param = exporter.createExportedWidget1()) {
    }
    myPublicMethod(param = exporter.createExportedWidget1()) {
    }
    myPrivateMethod(param = exporter.createExportedWidget1()) {
    }
    constructor(param = exporter.createExportedWidget1(), param1 = exporter.createExportedWidget1(), param2 = exporter.createExportedWidget1()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
class privateClassWithWithPrivateParmeterTypes2 {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget3()) {
    }
    static myPrivateStaticMethod(param = exporter.createExportedWidget3()) {
    }
    myPublicMethod(param = exporter.createExportedWidget3()) {
    }
    myPrivateMethod(param = exporter.createExportedWidget3()) {
    }
    constructor(param = exporter.createExportedWidget3(), param1 = exporter.createExportedWidget3(), param2 = exporter.createExportedWidget3()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
function publicFunctionWithPrivateParmeterTypes(param = exporter.createExportedWidget1()) {
}
function privateFunctionWithPrivateParmeterTypes(param = exporter.createExportedWidget1()) {
}
function publicFunctionWithPrivateParmeterTypes1(param = exporter.createExportedWidget3()) {
}
function privateFunctionWithPrivateParmeterTypes1(param = exporter.createExportedWidget3()) {
}
class publicClassWithPrivateModuleParameterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget2()) {
    }
    myPublicMethod(param = exporter.createExportedWidget2()) {
    }
    constructor(param = exporter.createExportedWidget2(), param1 = exporter.createExportedWidget2(), param2 = exporter.createExportedWidget2()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
class publicClassWithPrivateModuleParameterTypes2 {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget4()) {
    }
    myPublicMethod(param = exporter.createExportedWidget4()) {
    }
    constructor(param = exporter.createExportedWidget4(), param1 = exporter.createExportedWidget4(), param2 = exporter.createExportedWidget4()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithPrivateModuleParameterTypes2 = publicClassWithPrivateModuleParameterTypes2;
function publicFunctionWithPrivateModuleParameterTypes(param = exporter.createExportedWidget2()) {
}
function publicFunctionWithPrivateModuleParameterTypes1(param = exporter.createExportedWidget4()) {
}
class privateClassWithPrivateModuleParameterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget2()) {
    }
    myPublicMethod(param = exporter.createExportedWidget2()) {
    }
    constructor(param = exporter.createExportedWidget2(), param1 = exporter.createExportedWidget2(), param2 = exporter.createExportedWidget2()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
class privateClassWithPrivateModuleParameterTypes1 {
    param1;
    param2;
    static myPublicStaticMethod(param = exporter.createExportedWidget4()) {
    }
    myPublicMethod(param = exporter.createExportedWidget4()) {
    }
    constructor(param = exporter.createExportedWidget4(), param1 = exporter.createExportedWidget4(), param2 = exporter.createExportedWidget4()) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
function privateFunctionWithPrivateModuleParameterTypes(param = exporter.createExportedWidget2()) {
}
function privateFunctionWithPrivateModuleParameterTypes1(param = exporter.createExportedWidget4()) {
}

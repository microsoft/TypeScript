// @module: commonjs
// @declaration: true


// @Filename: privacyCannotNameVarTypeDeclFile_GlobalWidgets.ts
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

// @Filename: privacyCannotNameVarTypeDeclFile_Widgets.ts
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

// @Filename:privacyCannotNameVarTypeDeclFile_exporter.ts
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

// @Filename:privacyCannotNameVarTypeDeclFile_consumer.ts
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
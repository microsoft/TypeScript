// @module: commonjs
// @declaration: true


// @Filename: privacyFunctionReturnTypeDeclFile_GlobalWidgets.ts
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

// @Filename: privacyFunctionReturnTypeDeclFile_Widgets.ts
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

// @Filename:privacyFunctionReturnTypeDeclFile_exporter.ts
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

// @Filename:privacyFunctionReturnTypeDeclFile_consumer.ts
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

//// [tests/cases/compiler/privacyTypeParameterOfFunctionDeclFile.ts] ////

//// [privacyTypeParameterOfFunctionDeclFile.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateTypeParameters {
    new <T extends privateClass>(): privateClass;  // Error
    <T extends privateClass>(): privateClass;  // Error
    myMethod<T extends privateClass>(): privateClass;  // Error
}

export interface publicInterfaceWithPublicTypeParameters {
    new <T extends publicClass>(): publicClass;
    <T extends publicClass>(): publicClass;
    myMethod<T extends publicClass>(): publicClass;
}

interface privateInterfaceWithPrivateTypeParameters {
    new <T extends privateClass>(): privateClass;
    <T extends privateClass>(): privateClass;
    myMethod<T extends privateClass>(): privateClass;
}

interface privateInterfaceWithPublicTypeParameters {
    new <T extends publicClass>(): publicClass;
    <T extends publicClass>(): publicClass;
    myMethod<T extends publicClass>(): publicClass;
}

export class publicClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod<T extends privateClass>() {  // Error
    }
    private static myPrivateStaticMethod<T extends privateClass>() {
    }
    myPublicMethod<T extends privateClass>() {  // Error
    }
    private myPrivateMethod<T extends privateClass>() {
    }
}

export class publicClassWithWithPublicTypeParameters {
    static myPublicStaticMethod<T extends publicClass>() {
    }
    private static myPrivateStaticMethod<T extends publicClass>() { 
    }
    myPublicMethod<T extends publicClass>() {
    }
    private myPrivateMethod<T extends publicClass>() {
    }
}

class privateClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod<T extends privateClass>() {
    }
    private static myPrivateStaticMethod<T extends privateClass>() {
    }
    myPublicMethod<T extends privateClass>() {
    }
    private myPrivateMethod<T extends privateClass>() {
    }
}

class privateClassWithWithPublicTypeParameters {
    static myPublicStaticMethod<T extends publicClass>() {
    }
    private static myPrivateStaticMethod<T extends publicClass>() {
    }
    myPublicMethod<T extends publicClass>() {
    }
    private myPrivateMethod<T extends publicClass>() {
    }
}

export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() {  // Error
}

export function publicFunctionWithPublicTypeParameters<T extends publicClass>() {
}

function privateFunctionWithPrivateTypeParameters<T extends privateClass>() {
}

function privateFunctionWithPublicTypeParameters<T extends publicClass>() {
}

export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
    new <T>(): publicClass;
    <T>(): publicClass;
    myMethod<T>(): publicClass;
}

interface privateInterfaceWithPublicTypeParametersWithoutExtends {
    new <T>(): publicClass;
    <T>(): publicClass;
    myMethod<T>(): publicClass;
}

export class publicClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod<T>() {
    }
    private static myPrivateStaticMethod<T>() {
    }
    myPublicMethod<T>() {
    }
    private myPrivateMethod<T>() {
    }
}
class privateClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod<T>() {
    }
    private static myPrivateStaticMethod<T>() {
    }
    myPublicMethod<T>() {
    }
    private myPrivateMethod<T>() {
    }
}

export function publicFunctionWithPublicTypeParametersWithoutExtends<T>() {
}

function privateFunctionWithPublicTypeParametersWithoutExtends<T>() {
}

export interface publicInterfaceWithPrivatModuleTypeParameters {
    new <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
}
export class publicClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod<T extends privateModule.publicClass>() {  // Error
    }
    myPublicMethod<T extends privateModule.publicClass>() {  // Error
    }
}
export function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {  // Error
}


interface privateInterfaceWithPrivatModuleTypeParameters {
    new <T extends privateModule.publicClass>(): privateModule.publicClass;
    <T extends privateModule.publicClass>(): privateModule.publicClass;
    myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;
}
class privateClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod<T extends privateModule.publicClass>() {
    }
    myPublicMethod<T extends privateModule.publicClass>() {
    }
}
function privateFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {
}


export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;  // Error
        <T extends privateClass>(): privateClass;  // Error
        myMethod<T extends privateClass>(): privateClass;  // Error
    }

    export interface publicInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }

    interface privateInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;
        <T extends privateClass>(): privateClass;
        myMethod<T extends privateClass>(): privateClass;
    }

    interface privateInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }

    export class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>() {  // Error
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {  // Error
        }
        private myPrivateMethod<T extends privateClass>() {
        }
    }

    export class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>() {
        }
        private static myPrivateStaticMethod<T extends publicClass>() {
        }
        myPublicMethod<T extends publicClass>() {
        }
        private myPrivateMethod<T extends publicClass>() {
        }
    }

    class privateClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>() {
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {
        }
        private myPrivateMethod<T extends privateClass>() {
        }
    }

    class privateClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>() {
        }
        private static myPrivateStaticMethod<T extends publicClass>() {
        }
        myPublicMethod<T extends publicClass>() {
        }
        private myPrivateMethod<T extends publicClass>() {
        }
    }

    export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() {  // Error
    }

    export function publicFunctionWithPublicTypeParameters<T extends publicClass>() {
    }

    function privateFunctionWithPrivateTypeParameters<T extends privateClass>() {
    }

    function privateFunctionWithPublicTypeParameters<T extends publicClass>() {
    }

    export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }

    interface privateInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }

    export class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>() {
        }
        private static myPrivateStaticMethod<T>() {
        }
        myPublicMethod<T>() {
        }
        private myPrivateMethod<T>() {
        }
    }
    class privateClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>() {
        }
        private static myPrivateStaticMethod<T>() {
        }
        myPublicMethod<T>() {
        }
        private myPrivateMethod<T>() {
        }
    }

    export function publicFunctionWithPublicTypeParametersWithoutExtends<T>() {
    }

    function privateFunctionWithPublicTypeParametersWithoutExtends<T>() {
    }

    export interface publicInterfaceWithPrivatModuleTypeParameters {
        new <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
        <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
        myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    }
    export class publicClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod<T extends privateModule.publicClass>() {  // Error
        }
        myPublicMethod<T extends privateModule.publicClass>() {  // Error
        }
    }
    export function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {  // Error
    }


    interface privateInterfaceWithPrivatModuleTypeParameters {
        new <T extends privateModule.publicClass>(): privateModule.publicClass;  
        <T extends privateModule.publicClass>(): privateModule.publicClass;  
        myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  
    }
    class privateClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod<T extends privateModule.publicClass>() {  
        }
        myPublicMethod<T extends privateModule.publicClass>() { 
        }
    }
    function privateFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() { 
    }

}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass; 
        <T extends privateClass>(): privateClass;
        myMethod<T extends privateClass>(): privateClass; 
    }

    export interface publicInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }

    interface privateInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;
        <T extends privateClass>(): privateClass;
        myMethod<T extends privateClass>(): privateClass;
    }

    interface privateInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }

    export class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>() { 
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {  
        }
        private myPrivateMethod<T extends privateClass>() {
        }
    }

    export class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>() {
        }
        private static myPrivateStaticMethod<T extends publicClass>() {
        }
        myPublicMethod<T extends publicClass>() {
        }
        private myPrivateMethod<T extends publicClass>() {
        }
    }

    class privateClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>() {
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {
        }
        private myPrivateMethod<T extends privateClass>() {
        }
    }

    class privateClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>() {
        }
        private static myPrivateStaticMethod<T extends publicClass>() {
        }
        myPublicMethod<T extends publicClass>() {
        }
        private myPrivateMethod<T extends publicClass>() {
        }
    }

    export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() { 
    }

    export function publicFunctionWithPublicTypeParameters<T extends publicClass>() {
    }

    function privateFunctionWithPrivateTypeParameters<T extends privateClass>() {
    }

    function privateFunctionWithPublicTypeParameters<T extends publicClass>() {
    }

    export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }

    interface privateInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }

    export class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>() {
        }
        private static myPrivateStaticMethod<T>() {
        }
        myPublicMethod<T>() {
        }
        private myPrivateMethod<T>() {
        }
    }
    class privateClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>() {
        }
        private static myPrivateStaticMethod<T>() {
        }
        myPublicMethod<T>() {
        }
        private myPrivateMethod<T>() {
        }
    }

    export function publicFunctionWithPublicTypeParametersWithoutExtends<T>() {
    }

    function privateFunctionWithPublicTypeParametersWithoutExtends<T>() {
    }
}

//// [privacyTypeParameterOfFunctionDeclFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicClassWithWithPrivateModuleTypeParameters = exports.publicClassWithWithPublicTypeParametersWithoutExtends = exports.publicClassWithWithPublicTypeParameters = exports.publicClassWithWithPrivateTypeParameters = exports.publicClass = void 0;
exports.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
exports.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
exports.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
exports.publicFunctionWithPrivateMopduleTypeParameters = publicFunctionWithPrivateMopduleTypeParameters;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
class publicClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
class publicClassWithWithPublicTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
class privateClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
class privateClassWithWithPublicTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
function publicFunctionWithPrivateTypeParameters() {
}
function publicFunctionWithPublicTypeParameters() {
}
function privateFunctionWithPrivateTypeParameters() {
}
function privateFunctionWithPublicTypeParameters() {
}
class publicClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
class privateClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
function publicFunctionWithPublicTypeParametersWithoutExtends() {
}
function privateFunctionWithPublicTypeParametersWithoutExtends() {
}
class publicClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod() {
    }
    myPublicMethod() {
    }
}
exports.publicClassWithWithPrivateModuleTypeParameters = publicClassWithWithPrivateModuleTypeParameters;
function publicFunctionWithPrivateMopduleTypeParameters() {
}
class privateClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod() {
    }
    myPublicMethod() {
    }
}
function privateFunctionWithPrivateMopduleTypeParameters() {
}
var publicModule;
(function (publicModule) {
    class privateClass {
    }
    class publicClass {
    }
    publicModule.publicClass = publicClass;
    class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    publicModule.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
    class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    publicModule.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
    class privateClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    class privateClassWithWithPublicTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    function publicFunctionWithPrivateTypeParameters() {
    }
    publicModule.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
    function publicFunctionWithPublicTypeParameters() {
    }
    publicModule.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
    function privateFunctionWithPrivateTypeParameters() {
    }
    function privateFunctionWithPublicTypeParameters() {
    }
    class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    publicModule.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
    class privateClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    function publicFunctionWithPublicTypeParametersWithoutExtends() {
    }
    publicModule.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
    function privateFunctionWithPublicTypeParametersWithoutExtends() {
    }
    class publicClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod() {
        }
        myPublicMethod() {
        }
    }
    publicModule.publicClassWithWithPrivateModuleTypeParameters = publicClassWithWithPrivateModuleTypeParameters;
    function publicFunctionWithPrivateMopduleTypeParameters() {
    }
    publicModule.publicFunctionWithPrivateMopduleTypeParameters = publicFunctionWithPrivateMopduleTypeParameters;
    class privateClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod() {
        }
        myPublicMethod() {
        }
    }
    function privateFunctionWithPrivateMopduleTypeParameters() {
    }
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class privateClass {
    }
    class publicClass {
    }
    privateModule.publicClass = publicClass;
    class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    privateModule.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
    class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    privateModule.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
    class privateClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    class privateClassWithWithPublicTypeParameters {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    function publicFunctionWithPrivateTypeParameters() {
    }
    privateModule.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
    function publicFunctionWithPublicTypeParameters() {
    }
    privateModule.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
    function privateFunctionWithPrivateTypeParameters() {
    }
    function privateFunctionWithPublicTypeParameters() {
    }
    class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    privateModule.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
    class privateClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod() {
        }
        static myPrivateStaticMethod() {
        }
        myPublicMethod() {
        }
        myPrivateMethod() {
        }
    }
    function publicFunctionWithPublicTypeParametersWithoutExtends() {
    }
    privateModule.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
    function privateFunctionWithPublicTypeParametersWithoutExtends() {
    }
})(privateModule || (privateModule = {}));

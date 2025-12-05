// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @target: ESNext

// Function Variables
export const fnExpressionConstVariable = function foo() { return 0;}
export const fnArrowConstVariable = () => "S";

export let fnExpressionLetVariable = function foo() { return 0;}
export let fnArrowLetVariable = () => "S";

export var fnExpressionVarVariable = function foo() { return 0;}
export var fnArrowVarVariable = () => "S";

// No Errors
export const fnExpressionConstVariableOk = function foo(): number { return 0;}
export const fnArrowConstVariableOk = (cb = function(){ }): string => "S";

export let fnExpressionLetVariableOk = function foo(): number { return 0;}
export let fnArrowLetVariableOk = (cb = function(){ }): string => "S";

export var fnExpressionVarVariableOk = function foo(): number { return 0;}
export var fnArrowVarVariableOk = (cb = function(){ }): string => "S";

// Not exported
const fnExpressionConstVariableInternal = function foo() { return 0;}
const fnArrowConstVariableInternal = () => "S";

let fnExpressionLetVariableInternal = function foo() { return 0;}
let fnArrowLetVariableInternal = () => "S";

var fnExpressionVarVariableInternal = function foo() { return 0;}
var fnArrowVarVariableInternal = () => "S";

// Function Fields
export class ExportedClass { 
    // Should Error
    fnExpression = function foo() { return 0; }
    fnArrow = () => "S";    
    protected fnExpressionProtected = function foo() { return 0; }
    protected fnArrowProtected = () => "S";

    static fnStaticExpression = function foo() { return 0; }
    static fnStaticArrow = () => "S";
    protected static fnStaticExpressionProtected = function foo() { return 0; }    
    protected static fnStaticArrowProtected = () => "S";

    // Have annotation, so ok 
    fnExpressionOk = function foo(): number { return 0; }
    fnArrowOK = (): string => "S";
    protected fnExpressionProtectedOk = function foo(): number { return 0; }
    protected fnArrowProtectedOK = (): string => "S";

    static fnStaticExpressionOk = function foo(): number { return 0; }
    static fnStaticArrowOk = (): string => "S";
    protected static fnStaticExpressionProtectedOk = function foo(): number { return 0; }    
    protected static fnStaticArrowProtectedOk = (): string => "S";
    

    // No Error not in declarations
    private fnExpressionPrivate = function foo() { return 0; }
    private fnArrowPrivate = () => "S";
    #fnArrow = () => "S";
    #fnExpression = function foo() { return 0;}
    private static fnStaticExpressionPrivate = function foo() { return 0; }
    private static fnStaticArrowPrivate = () => "S";
}

// Should error
class IndirectlyExportedClass { 
    fnExpression = function foo() { return 0; }
    fnArrow = () => "S";

    static fnStaticExpression = function foo() { return 0; }
    static fnStaticArrow = () => "S";
    
    protected static fnStaticExpressionProtected = function foo() { return 0; }    
    protected static fnStaticArrowProtected = () => "S";

    private fnExpressionPrivate = function foo() { return 0; }
    private fnArrowPrivate = () => "S";
    #fnArrow = () => "S";
    #fnExpression = function foo() { return 0;}
    private static fnStaticExpressionPrivate = function foo() { return 0; }
    private static fnStaticArrowPrivate = () => "S";
}
export const instance: IndirectlyExportedClass = new IndirectlyExportedClass();

// No Errors
class InternalClass { 
    fnExpression = function foo() { return 0; }
    fnArrow = () => "S";

    static fnStaticExpression = function foo() { return 0; }
    static fnStaticArrow = () => "S";
    
    protected static fnStaticExpressionProtected = function foo() { return 0; }    
    protected static fnStaticArrowProtected = () => "S";

    private fnExpressionPrivate = function foo() { return 0; }
    private fnArrowPrivate = () => "S";
    #fnArrow = () => "S";
    #fnExpression = function foo() { return 0;}
    private static fnStaticExpressionPrivate = function foo() { return 0; }
    private static fnStaticArrowPrivate = () => "S";
}
const internalInstance: InternalClass = new InternalClass();


// Function parameters

// In Function Variables - No annotations
export const fnParamExpressionConstVariable = function foo(cb = function(){ }) { return 0;}
export const fnParamArrowConstVariable = (cb = () => 1) => "S";

export let fnParamExpressionLetVariable = function foo(cb = function(){ }) { return 0;}
export let fnParamArrowLetVariable = (cb = () => 1) => "S";

export var fnParamExpressionVarVariable = function foo(cb = function(){ }) { return 0;}
export var fnParamArrowVarVariable = (cb = () => 1) => "S";

// In Function Variables - No annotations on parameter
export const fnParamExpressionConstVariableOwnerHasReturnType = function foo(cb = function(){ }): number { return 0;}
export const fnParamArrowConstVariableOwnerHasReturnType = (cb = function(){ }): string => "S";

export let fnParamExpressionLetVariableOwnerHasReturnType = function foo(cb = function(){ }): number { return 0;}
export let fnParamArrowLetVariableOwnerHasReturnType = (cb = function(){ }): string => "S";

export var fnParamExpressionVarVariableOwnerHasReturnType = function foo(cb = function(){ }): number { return 0;}
export var fnParamArrowVarVariableOwnerHasReturnType = (cb = function(){ }): string => "S";

// No Errors
export const fnParamExpressionConstVariableOk = function foo(cb = function(): void{ }): number { return 0;}
export const fnParamArrowConstVariableOk = (cb = function(): void{ }): string => "S";

export let fnParamExpressionLetVariableOk = function foo(cb = function(): void{ }): number { return 0;}
export let fnParamArrowLetVariableOk = (cb = function(): void{ }): string => "S";

export var fnParamExpressionVarVariableOk = function foo(cb = function(): void{ }): number { return 0;}
export var fnParamArrowVarVariableOk = (cb = function(): void{ }): string => "S";

export const fnParamExpressionConstVariableInternal = function foo(cb = function(){ }) { return 0;}
export const fnParamArrowConstVariableInternal = (cb = () => 1) => "S";

export let fnParamExpressionLetVariableInternal = function foo(cb = function(){ }) { return 0;}
export let fnParamArrowLetVariableInternal = (cb = () => 1) => "S";

export var fnParamExpressionVarVariableInternal = function foo(cb = function(){ }) { return 0;}
export var fnParamArrowVarVariableInternal = (cb = () => 1) => "S";


// In Function Fields
export class FnParamsExportedClass { 
    // Should Error
    fnExpression = function foo(cb = function(){ }) { return 0; }
    fnArrow = (cb = function(){ }) => "S";
    protected fnExpressionProtected = function foo(cb = function(){ }) { return 0; }
    protected fnArrowProtected = (cb = function(){ }) => "S";

    static fnStaticExpression = function foo(cb = function(){ }) { return 0; }
    static fnStaticArrow = (cb = function(){ }) => "S";
    protected static fnStaticExpressionProtected = function foo(cb = function(){ }) { return 0; }    
    protected static fnStaticArrowProtected = (cb = function(){ }) => "S";

    // Have annotation on owner
    fnExpressionMethodHasReturn = function foo(cb = function(){ }): number { return 0; }
    fnArrowMethodHasReturn = (cb = function(){ }): string => "S";
    protected fnExpressionProtectedMethodHasReturn = function foo(cb = function(){ }): number { return 0; }
    protected fnArrowProtectedMethodHasReturn = (cb = function(){ }): string => "S";

    static fnStaticExpressionMethodHasReturn = function foo(cb = function(){ }): number { return 0; }
    static fnStaticArrowMethodHasReturn = (cb = function(){ }): string => "S";
    protected static fnStaticExpressionProtectedMethodHasReturn = function foo(cb = function(){ }): number { return 0; }    
    protected static fnStaticArrowProtectedMethodHasReturn = (cb = function(){ }): string => "S";

    // Have annotation only on parameter
    fnExpressionOnlyOnParam = function foo(cb = function(): void { }) { return 0; }
    fnArrowOnlyOnParam = (cb = function(): void { }) => "S";
    protected fnExpressionProtectedOnlyOnParam = function foo(cb = function(): void { }) { return 0; }
    protected fnArrowProtectedOnlyOnParam = (cb = function(): void { }) => "S";

    static fnStaticExpressionOnlyOnParam = function foo(cb = function(): void{ }) { return 0; }
    static fnStaticArrowOnlyOnParam = (cb = function(): void{ }) => "S";
    protected static fnStaticExpressionProtectedOnlyOnParam = function foo(cb = function(): void{ }) { return 0; }    
    protected static fnStaticArrowProtectedOnlyOnParam = (cb = function(): void{ }) => "S";

    // Have annotation, so ok 
    fnExpressionOk = function foo(cb = function(): void { }): number { return 0; }
    fnArrowOK = (cb = function(): void { }): string => "S";
    protected fnExpressionProtectedOk = function foo(cb = function(): void { }): number { return 0; }
    protected fnArrowProtectedOK = (cb = function(): void { }): string => "S";

    static fnStaticExpressionOk = function foo(cb = function(): void{ }): number { return 0; }
    static fnStaticArrowOk = (cb = function(): void{ }): string => "S";
    protected static fnStaticExpressionProtectedOk = function foo(cb = function(): void{ }): number { return 0; }    
    protected static fnStaticArrowProtectedOk = (cb = function(): void{ }): string => "S";
    

    // No Error, not in declarations
    private fnExpressionPrivate = function foo(cb = function(){ }) { return 0; }
    private fnArrowPrivate = (cb = function(){ }) => "S";
    #fnArrow = (cb = function(){ }) => "S";
    #fnExpression = function foo(cb = function(){ }) { return 0;}
    private static fnStaticExpressionPrivate = function foo(cb = function(){ }) { return 0; }
    private static fnStaticArrowPrivate = (cb = function(){ }) => "S";
}

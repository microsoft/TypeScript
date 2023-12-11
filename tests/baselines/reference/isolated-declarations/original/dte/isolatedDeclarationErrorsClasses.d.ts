//// [tests/cases/compiler/isolatedDeclarationErrorsClasses.ts] ////

//// [isolatedDeclarationErrorsClasses.ts]
export class Cls {

    field = 1 + 1;
    method() {}

    methodOk(): void {}

    methodParams(p): void {}
    methodParams2(p = 1 + 1): void {}

    get getOnly() { return 0 }
    set setOnly(value) { }

    get getSetBad() { return 0 }
    set getSetBad(value) { }

    get getSetOk(): number { return 0 }
    set getSetOk(value) { }

    get getSetOk2() { return 0 }
    set getSetOk2(value: number) { }

    get getSetOk3(): number { return 0 }
    set getSetOk3(value: number) { }
}

let noAnnotationStringName: string = "noAnnotationStringName";
let noParamAnnotationStringName: string = "noParamAnnotationStringName";

const noAnnotationLiteralName = "noAnnotationLiteralName";
const noParamAnnotationLiteralName = "noParamAnnotationLiteralName";

export class C {

    [noAnnotationLiteralName](): void { }

    [noParamAnnotationLiteralName](v: string): void { }

    [noAnnotationStringName]() { }

    [noParamAnnotationStringName](v): void { }

    get [noAnnotationStringName]() { return 0;}

    set [noParamAnnotationStringName](value) { }
}



/// [Declarations] ////



//// [isolatedDeclarationErrorsClasses.d.ts]
export declare class Cls {
    field: invalid;
    method(): invalid;
    methodOk(): void;
    methodParams(p: invalid): void;
    methodParams2(p?: invalid): void;
    get getOnly(): invalid;
    set setOnly(value: invalid);
    get getSetBad(): invalid;
    set getSetBad(value: invalid);
    get getSetOk(): number;
    set getSetOk(value: number);
    get getSetOk2(): number;
    set getSetOk2(value: number);
    get getSetOk3(): number;
    set getSetOk3(value: number);
}
declare let noAnnotationStringName: string;
declare let noParamAnnotationStringName: string;
declare const noAnnotationLiteralName = "noAnnotationLiteralName";
declare const noParamAnnotationLiteralName = "noParamAnnotationLiteralName";
export declare class C {
    [noAnnotationLiteralName](): void;
    [noParamAnnotationLiteralName](v: string): void;
    [noAnnotationStringName](): invalid;
    [noParamAnnotationStringName](v: invalid): void;
    get [noAnnotationStringName](): invalid;
    set [noParamAnnotationStringName](value: invalid);
}
export {};

/// [Errors] ////

isolatedDeclarationErrorsClasses.ts(3,13): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(8,18): error TS7006: Parameter 'p' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(8,18): error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(9,23): error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(11,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(12,9): error TS7032: Property 'setOnly' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
isolatedDeclarationErrorsClasses.ts(12,17): error TS7006: Parameter 'value' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(12,17): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(14,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(39,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(41,35): error TS7006: Parameter 'v' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(41,35): error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(43,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
isolatedDeclarationErrorsClasses.ts(45,9): error TS7032: Property '[noParamAnnotationStringName]' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
isolatedDeclarationErrorsClasses.ts(45,39): error TS7006: Parameter 'value' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(45,39): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations


==== isolatedDeclarationErrorsClasses.ts (17 errors) ====
    export class Cls {
    
        field = 1 + 1;
                ~~~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations
!!! related TS9029 isolatedDeclarationErrorsClasses.ts:3:5: Add a type annotation to the property field
        method() {}
        ~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 isolatedDeclarationErrorsClasses.ts:4:5: Add a return type to the method
    
        methodOk(): void {}
    
        methodParams(p): void {}
                     ~
!!! error TS7006: Parameter 'p' implicitly has an 'any' type.
                     ~
!!! error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
!!! related TS9028 isolatedDeclarationErrorsClasses.ts:8:18: Add a type annotation to the parameter p
        methodParams2(p = 1 + 1): void {}
                          ~~~~~
!!! error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
!!! related TS9028 isolatedDeclarationErrorsClasses.ts:9:19: Add a type annotation to the parameter p
    
        get getOnly() { return 0 }
            ~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9032 isolatedDeclarationErrorsClasses.ts:11:9: Add a return type to the get accessor declaration
        set setOnly(value) { }
            ~~~~~~~
!!! error TS7032: Property 'setOnly' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
                    ~~~~~
!!! error TS7006: Parameter 'value' implicitly has an 'any' type.
                    ~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 isolatedDeclarationErrorsClasses.ts:12:9: Add a type to parameter of the set accessor declaration
    
        get getSetBad() { return 0 }
            ~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 isolatedDeclarationErrorsClasses.ts:15:9: Add a type to parameter of the set accessor declaration
!!! related TS9032 isolatedDeclarationErrorsClasses.ts:14:9: Add a return type to the get accessor declaration
        set getSetBad(value) { }
    
        get getSetOk(): number { return 0 }
        set getSetOk(value) { }
    
        get getSetOk2() { return 0 }
        set getSetOk2(value: number) { }
    
        get getSetOk3(): number { return 0 }
        set getSetOk3(value: number) { }
    }
    
    let noAnnotationStringName: string = "noAnnotationStringName";
    let noParamAnnotationStringName: string = "noParamAnnotationStringName";
    
    const noAnnotationLiteralName = "noAnnotationLiteralName";
    const noParamAnnotationLiteralName = "noParamAnnotationLiteralName";
    
    export class C {
    
        [noAnnotationLiteralName](): void { }
    
        [noParamAnnotationLiteralName](v: string): void { }
    
        [noAnnotationStringName]() { }
        ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 isolatedDeclarationErrorsClasses.ts:39:5: Add a return type to the method
    
        [noParamAnnotationStringName](v): void { }
                                      ~
!!! error TS7006: Parameter 'v' implicitly has an 'any' type.
                                      ~
!!! error TS9011: Parameter must have an explicit type annotation with --isolatedDeclarations
!!! related TS9028 isolatedDeclarationErrorsClasses.ts:41:35: Add a type annotation to the parameter v
    
        get [noAnnotationStringName]() { return 0;}
            ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9032 isolatedDeclarationErrorsClasses.ts:43:9: Add a return type to the get accessor declaration
    
        set [noParamAnnotationStringName](value) { }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS7032: Property '[noParamAnnotationStringName]' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
                                          ~~~~~
!!! error TS7006: Parameter 'value' implicitly has an 'any' type.
                                          ~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 isolatedDeclarationErrorsClasses.ts:45:9: Add a type to parameter of the set accessor declaration
    }
    
    
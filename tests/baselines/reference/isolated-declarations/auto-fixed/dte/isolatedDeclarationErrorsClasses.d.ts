//// [tests/cases/compiler/isolatedDeclarationErrorsClasses.ts] ////

//// [isolatedDeclarationErrorsClasses.ts]
export class Cls {

    field: number = 1 + 1;
    method(): void {}

    methodOk(): void {}

    methodParams(p: any): void {}
    methodParams2(p: number = 1 + 1): void {}

    get getOnly(): number { return 0 }
    set setOnly(value: any) { }

    get getSetBad(): number { return 0 }
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

    // Should not be reported as an isolated declaration error
    [missing] = 1;
    
    [noAnnotationLiteralName](): void { }

    [noParamAnnotationLiteralName](v: string): void { }

    [noAnnotationStringName](): void { }

    [noParamAnnotationStringName](v): void { }

    get [noAnnotationStringName](): number { return 0;}

    set [noParamAnnotationStringName](value) { }

    [("A" + "B") as "AB"] =  1;

}

export interface I {
    [noAnnotationStringName]: 10;
    [noAnnotationLiteralName]();
}

/// [Declarations] ////



//// [isolatedDeclarationErrorsClasses.d.ts]
export declare class Cls {
    field: number;
    method(): void;
    methodOk(): void;
    methodParams(p: any): void;
    methodParams2(p?: number): void;
    get getOnly(): number;
    set setOnly(value: any);
    get getSetBad(): number;
    set getSetBad(value: number);
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
    [missing]: number;
    [noAnnotationLiteralName](): void;
    [noParamAnnotationLiteralName](v: string): void;
    get [noAnnotationStringName](): number;
    set [noParamAnnotationStringName](value: invalid);
}
export interface I {
    [noAnnotationStringName]: 10;
    [noAnnotationLiteralName](): any;
}
export {};

/// [Errors] ////

isolatedDeclarationErrorsClasses.ts(36,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
isolatedDeclarationErrorsClasses.ts(36,6): error TS2304: Cannot find name 'missing'.
isolatedDeclarationErrorsClasses.ts(44,35): error TS7006: Parameter 'v' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(48,9): error TS7032: Property '[noParamAnnotationStringName]' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
isolatedDeclarationErrorsClasses.ts(48,39): error TS7006: Parameter 'value' implicitly has an 'any' type.
isolatedDeclarationErrorsClasses.ts(48,39): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
isolatedDeclarationErrorsClasses.ts(50,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
isolatedDeclarationErrorsClasses.ts(55,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
isolatedDeclarationErrorsClasses.ts(56,5): error TS7010: '[noAnnotationLiteralName]', which lacks return-type annotation, implicitly has an 'any' return type.


==== isolatedDeclarationErrorsClasses.ts (9 errors) ====
    export class Cls {
    
        field: number = 1 + 1;
        method(): void {}
    
        methodOk(): void {}
    
        methodParams(p: any): void {}
        methodParams2(p: number = 1 + 1): void {}
    
        get getOnly(): number { return 0 }
        set setOnly(value: any) { }
    
        get getSetBad(): number { return 0 }
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
    
        // Should not be reported as an isolated declaration error
        [missing] = 1;
        ~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~~~~~~~
!!! error TS2304: Cannot find name 'missing'.
        
        [noAnnotationLiteralName](): void { }
    
        [noParamAnnotationLiteralName](v: string): void { }
    
        [noAnnotationStringName](): void { }
    
        [noParamAnnotationStringName](v): void { }
                                      ~
!!! error TS7006: Parameter 'v' implicitly has an 'any' type.
    
        get [noAnnotationStringName](): number { return 0;}
    
        set [noParamAnnotationStringName](value) { }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS7032: Property '[noParamAnnotationStringName]' implicitly has type 'any', because its set accessor lacks a parameter type annotation.
                                          ~~~~~
!!! error TS7006: Parameter 'value' implicitly has an 'any' type.
                                          ~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 isolatedDeclarationErrorsClasses.ts:48:9: Add a type to parameter of the set accessor declaration.
    
        [("A" + "B") as "AB"] =  1;
        ~~~~~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
    
    }
    
    export interface I {
        [noAnnotationStringName]: 10;
        ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
        [noAnnotationLiteralName]();
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS7010: '[noAnnotationLiteralName]', which lacks return-type annotation, implicitly has an 'any' return type.
    }
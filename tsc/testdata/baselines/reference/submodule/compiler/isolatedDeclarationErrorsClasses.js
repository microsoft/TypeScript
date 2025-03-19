//// [tests/cases/compiler/isolatedDeclarationErrorsClasses.ts] ////

//// [isolatedDeclarationErrorsClasses.ts]
export class Cls {

    field = 1 + 1;
    method() {}

    methodOk(): void {}

    methodParams(p): void {}
    methodParams2(p = 1 + 1): void {}

    get getOnly() { return 1 + 1 }
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

    // Should not be reported as an isolated declaration error
    [missing] = 1;
    
    [noAnnotationLiteralName](): void { }

    [noParamAnnotationLiteralName](v: string): void { }

    [noAnnotationStringName]() { }

    [noParamAnnotationStringName](v): void { }

    get [noAnnotationStringName]() { return 0;}

    set [noParamAnnotationStringName](value) { }

    [("A" + "B") as "AB"] =  1;

}

export interface I {
    [noAnnotationStringName]: 10;
    [noAnnotationLiteralName]();
}

//// [isolatedDeclarationErrorsClasses.js]
export class Cls {
    field = 1 + 1;
    method() { }
    methodOk() { }
    methodParams(p) { }
    methodParams2(p = 1 + 1) { }
    get getOnly() { return 1 + 1; }
    set setOnly(value) { }
    get getSetBad() { return 0; }
    set getSetBad(value) { }
    get getSetOk() { return 0; }
    set getSetOk(value) { }
    get getSetOk2() { return 0; }
    set getSetOk2(value) { }
    get getSetOk3() { return 0; }
    set getSetOk3(value) { }
}
let noAnnotationStringName = "noAnnotationStringName";
let noParamAnnotationStringName = "noParamAnnotationStringName";
const noAnnotationLiteralName = "noAnnotationLiteralName";
const noParamAnnotationLiteralName = "noParamAnnotationLiteralName";
export class C {
    // Should not be reported as an isolated declaration error
    [missing] = 1;
    [noAnnotationLiteralName]() { }
    [noParamAnnotationLiteralName](v) { }
    [noAnnotationStringName]() { }
    [noParamAnnotationStringName](v) { }
    get [noAnnotationStringName]() { return 0; }
    set [noParamAnnotationStringName](value) { }
    [("A" + "B")] = 1;
}

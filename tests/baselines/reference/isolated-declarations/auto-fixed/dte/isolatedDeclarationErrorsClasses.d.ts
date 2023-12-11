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

    [noAnnotationLiteralName](): void { }

    [noParamAnnotationLiteralName](v: string): void { }

    [noAnnotationStringName](): void { }

    [noParamAnnotationStringName](v: any): void { }

    get [noAnnotationStringName](): number { return 0;}

    set [noParamAnnotationStringName](value: any) { }
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
    [noAnnotationLiteralName](): void;
    [noParamAnnotationLiteralName](v: string): void;
    [noAnnotationStringName](): void;
    [noParamAnnotationStringName](v: any): void;
    get [noAnnotationStringName](): number;
    set [noParamAnnotationStringName](value: any);
}
export {};

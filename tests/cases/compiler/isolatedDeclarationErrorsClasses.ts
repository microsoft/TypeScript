// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
// @isolatedDeclarationFixedDiffReason: Invalid computed property can only be detected by TSC
// @strict: true
// @target: ESNext

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


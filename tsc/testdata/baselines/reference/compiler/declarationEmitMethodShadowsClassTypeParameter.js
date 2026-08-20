//// [tests/cases/compiler/declarationEmitMethodShadowsClassTypeParameter.ts] ////

//// [declarationEmitMethodShadowsClassTypeParameter.ts]
export class Outer<Table> {
    method<Table, R>(r: R) {
        return null as Table | null;
    }
}


//// [declarationEmitMethodShadowsClassTypeParameter.js]
export class Outer {
    method(r) {
        return null;
    }
}


//// [declarationEmitMethodShadowsClassTypeParameter.d.ts]
export declare class Outer<Table> {
    method<Table, R>(r: R): Table | null;
}

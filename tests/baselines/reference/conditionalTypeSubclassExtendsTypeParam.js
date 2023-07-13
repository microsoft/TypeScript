//// [tests/cases/compiler/conditionalTypeSubclassExtendsTypeParam.ts] ////

//// [conditionalTypeSubclassExtendsTypeParam.ts]
declare class Model<M extends MR, MR extends {}> {
    public getField2<K extends keyof M>(): Field<M[K], [K] extends [keyof MR] ? MR[K] : M[K]>
}

declare class Field<T extends TR, TR> {
}

//// [conditionalTypeSubclassExtendsTypeParam.js]

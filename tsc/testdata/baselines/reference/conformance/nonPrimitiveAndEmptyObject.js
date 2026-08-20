//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveAndEmptyObject.ts] ////

//// [nonPrimitiveAndEmptyObject.ts]
// Repro from #49480

export interface BarProps {
    barProp?: string;
}

export interface FooProps {
    fooProps?: BarProps & object;
}

declare const foo: FooProps;
const { fooProps = {} } = foo;

fooProps.barProp;


//// [nonPrimitiveAndEmptyObject.js]
// Repro from #49480
const { fooProps = {} } = foo;
fooProps.barProp;
export {};


//// [nonPrimitiveAndEmptyObject.d.ts]
export interface BarProps {
    barProp?: string;
}
export interface FooProps {
    fooProps?: BarProps & object;
}

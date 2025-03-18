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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fooProps = {} } = foo;
fooProps.barProp;

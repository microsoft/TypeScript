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
// Repro from #49480
Object.defineProperty(exports, "__esModule", { value: true });
var _a = foo.fooProps, fooProps = _a === void 0 ? {} : _a;
fooProps.barProp;


//// [nonPrimitiveAndEmptyObject.d.ts]
export interface BarProps {
    barProp?: string;
}
export interface FooProps {
    fooProps?: BarProps & object;
}

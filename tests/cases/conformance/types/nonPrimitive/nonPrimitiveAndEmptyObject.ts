// @strict: true
// @declaration: true

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

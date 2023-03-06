// @noImplicitAny: true
// @strictNullChecks: true
// @jsx: preserve

// Repro from #41759
namespace JSX {
    export interface Element {}
}

type DiscriminatorTrue = {
    disc: true;
    cb: (x: string) => void;
}

type DiscriminatorFalse = {
    disc?: false;
    cb: (x: number) => void;
}

type Props = DiscriminatorTrue | DiscriminatorFalse;

declare function Comp(props: DiscriminatorTrue | DiscriminatorFalse): JSX.Element;

// simple inference
void (<Comp disc cb={s => parseInt(s)} />);

// simple inference
void (<Comp disc={false} cb={n => n.toFixed()} />);

// simple inference when strict-null-checks are enabled
void (<Comp disc={undefined} cb={n => n.toFixed()} />);

// requires checking type information since discriminator is missing from object
void (<Comp cb={n => n.toFixed()} />);

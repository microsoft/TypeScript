//// [tsxDiscriminantPropertyInference.tsx]
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

type Unrelated = {
    val: number;
}

type Props = DiscriminatorTrue | DiscriminatorFalse;

type UnrelatedProps = Props | Unrelated;

declare function Comp(props: Props): JSX.Element;

// simple inference
void (<Comp disc cb={s => parseInt(s)} />);

// simple inference
void (<Comp disc={false} cb={n => n.toFixed()} />);

// simple inference when strict-null-checks are enabled
void (<Comp disc={undefined} cb={n => n.toFixed()} />);

// requires checking type information since discriminator is missing from object
void (<Comp cb={n => n.toFixed()} />);

declare function UnrelatedComp(props: UnrelatedProps): JSX.Element;

// requires checking properties of all types, rather than properties of just the union type (e.g. only intersection)
void (<Comp cb={n => n.toFixed()} />);


//// [tsxDiscriminantPropertyInference.jsx]
// simple inference
void (<Comp disc cb={function (s) { return parseInt(s); }}/>);
// simple inference
void (<Comp disc={false} cb={function (n) { return n.toFixed(); }}/>);
// simple inference when strict-null-checks are enabled
void (<Comp disc={undefined} cb={function (n) { return n.toFixed(); }}/>);
// requires checking type information since discriminator is missing from object
void (<Comp cb={function (n) { return n.toFixed(); }}/>);
// requires checking properties of all types, rather than properties of just the union type (e.g. only intersection)
void (<Comp cb={function (n) { return n.toFixed(); }}/>);

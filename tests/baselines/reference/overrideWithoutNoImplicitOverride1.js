//// [tests/cases/conformance/override/overrideWithoutNoImplicitOverride1.ts] ////

//// [overrideWithoutNoImplicitOverride1.ts]
export declare class AmbientClass {
    override yadda(): void;
}

export class NonAmbientClass {
    override yadda(): void {}
}

/////

export declare class AmbientBase {
    foo(): void;
}

export declare class AmbientDerived extends AmbientBase {
    foo(): void;

    override bar(): void;
}

/////

declare namespace ambientNamespace {
    export class AmbientBase {
        foo(): void;
    }

    export class AmbientDerived extends AmbientBase {
        foo(): void;

        override bar(): void;
    }
}

/////

export class NonAmbientBase {
    foo(): void {}
}

export class NonAmbientDerived extends NonAmbientBase {
    foo(): void {}

    override bar(): void {}
}


//// [overrideWithoutNoImplicitOverride1.js]
export class NonAmbientClass {
    yadda() { }
}
/////
export class NonAmbientBase {
    foo() { }
}
export class NonAmbientDerived extends NonAmbientBase {
    foo() { }
    bar() { }
}

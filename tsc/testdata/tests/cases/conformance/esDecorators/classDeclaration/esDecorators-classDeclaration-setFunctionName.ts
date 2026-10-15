// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

// @filename: a.ts
declare let dec: any;

@dec class C {}

@dec class C1 {
    #field = C1;
}

@dec class C2 {
    #method() { return C2; }
}

@dec class C3 {
    get #accessor() { return C3; }
}

@dec class C4 {
    set #accessor(value: unknown) { C4; }
}

export {}

// @filename: b.ts
declare let dec: any;

@dec export class C {}

// @filename: c.ts
declare let dec: any;

@dec export default class C {}

// @filename: c.ts
declare let dec: any;

@dec export default class {}

//// [ambientAccessors.ts]
// ok to use accessors in ambient class in ES3
declare class C {
    get x(): string;
    set x(value: string);
    static get y(): string;
    static set y(value: string);
}

//// [ambientAccessors.js]


//// [ambientAccessors.d.ts]
declare class C {
    get x(): string;
    set x(value: string);
    static get y(): string;
    static set y(value: string);
}

// @target: es3, es5
// @declaration: true
// ok to use accessors in ambient class in ES3
declare class C {
    get x(): string;
    set x(value: string);
    static get y(): string;
    static set y(value: string);
}
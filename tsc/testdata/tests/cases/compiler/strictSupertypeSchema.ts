// @strict: true
// @noEmit: true

interface Schema {
    [name: string]: any;
}

declare function choose<Result>(...callbacks: (() => Result)[]): Result;
declare const schema: Schema;

const result = choose(() => ({}), () => schema);
result.$ref;

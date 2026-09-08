// @strict: true
// @noEmit: true

interface Schema<T> {
    optional: boolean;
    output: T;
}

interface TextSchema extends Schema<string> {
    optional: false;
}

type Shape = Record<string, any>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type Output<S extends Shape> = Prettify<{
    [K in keyof S as S[K] extends { optional: true } ? K : never]?: S[K]["output"];
} & {
    [K in keyof S as S[K] extends { optional: true } ? never : K]: S[K]["output"];
}>;

interface ObjectSchema<S extends Shape> extends Schema<Output<S>> {
    optional: false;
}

interface OptionalSchema<S extends Schema<any>> extends Schema<S["output"] | undefined> {
    optional: true;
}

declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
declare function text(): TextSchema;
declare function optional<S extends Schema<any>>(schema: S): OptionalSchema<S>;

const node = object({
    name: text(),
    get parent() {
        return optional(node);
    },
});

export const output = node.output;
const name: string = output.parent!.parent!.name;
const wrong: number = output.parent!.name;
output.parent!.missing;

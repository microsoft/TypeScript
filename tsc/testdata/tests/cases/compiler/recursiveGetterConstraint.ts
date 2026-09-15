// @strict: true
// @noEmit: true

interface Schema<T = unknown> {
    output: T;
}

type Shape = Record<string, Schema>;
type Output<S extends Shape> = { [K in keyof S]: S[K]["output"] };

declare function object<S extends Shape>(shape: S): Schema<Output<S>>;
declare function array<S extends Schema>(schema: S): Schema<S["output"][]>;
declare function text(): Schema<string>;

const node = object({
    name: text(),
    get children() {
        return array(node);
    },
});

const name: string = node.output.children[0].children[0].name;
const wrong: number = node.output.children[0].name;
node.output.children[0].missing;

export {};

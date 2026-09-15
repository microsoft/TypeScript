// @strict: true
// @noEmit: true

interface Schema<T = unknown> {
    output: T;
}

type Shape = Record<string, Schema | (() => Schema)>;
type Resolve<T> = T extends () => infer R ? R : T;
type Output<S extends Shape> = { [K in keyof S]: Resolve<S[K]> extends Schema<infer O> ? O : never };

declare function object<S extends Shape>(shape: S): Schema<Output<S>>;
declare function array<S extends Schema>(schema: S): Schema<S["output"][]>;
declare function text(): Schema<string>;

const node = object({
    name: text(),
    children: () => array(node),
});

const name: string = node.output.children[0].children[0].name;
const wrong: number = node.output.children[0].name;
node.output.children[0].missing;

const tree = object({
    name: text(),
    children() {
        return array(tree);
    },
});

const treeName: string = tree.output.children[0].children[0].name;
tree.output.children[0].missing;

export const user = object({ name: text(), posts: () => array(post) });
const post = object({ title: text(), author: () => user });

const authorName: string = user.output.posts[0].author.posts[0].author.name;
user.output.posts[0].author.missing;

const mixed = object({ name: text(), self: () => array(mixed), other: () => text() });
const otherName: string = mixed.output.self[0].other;

const invalid = object({ name: text(), bad: 42, self: () => array(invalid) });
const invalidName: string = invalid.output.self[0].name;

declare function wrap<T extends Schema<string>>(value: T): T;
const plain = wrap({ output: () => 42 });
const plainOutput: string = plain.output;

type LeafOutput = { name: string; children: LeafOutput[] };
const leaf = object({ name: text(), children: (): Schema<LeafOutput[]> => array(leaf) });
const leafName: string = leaf.output.children[0].name;

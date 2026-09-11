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

const base = { name: text() };

const node = object({
    ...base,
    get children() {
        return array(node);
    },
});

const name: string = node.output.children[0].children[0].name;
const wrong: number = node.output.children[0].name;
node.output.children[0].missing;

const leading = object({
    get children() {
        return array(leading);
    },
    ...base,
});

const leadingName: string = leading.output.children[0].name;

const withChildren = { name: text(), children: text() };
const overridden = object({
    ...withChildren,
    get children() {
        return array(overridden);
    },
});

const overriddenName: string = overridden.output.children[0].children[0].name;

const nested = object({
    ...base,
    ...{
        get children() {
            return array(nested);
        },
    },
});

const nestedName: string = nested.output.children[0].children[0].name;

const user = object({
    ...base,
    get posts() {
        return array(post);
    },
});
const post = object({
    ...base,
    get author() {
        return user;
    },
});

const authorName: string = user.output.posts[0].author.name;

const rejected = object({
    ...base,
    get count() {
        return 1;
    },
});

// An inline literal's overridden property is contextually typed by the inferred
// shape, which needs the getter's type before the declaration has one.
const inlineOverridden = object({
    ...{ children: text() },
    get children() {
        return array(inlineOverridden);
    },
});

export {};

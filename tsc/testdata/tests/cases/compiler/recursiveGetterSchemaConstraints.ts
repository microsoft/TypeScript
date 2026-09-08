// @strict: true
// @noEmit: true

interface Internals<out O, out I> {
    output: O;
    input: I;
    optionalOutput?: true;
    optionalInput?: true;
}

interface Schema<out O = unknown, out I = unknown> {
    internals: Internals<O, I>;
}

type Output<T extends Schema> = T["internals"]["output"];
type Input<T extends Schema> = T["internals"]["input"];

interface TextSchema extends Schema<string, number> {}
interface ArraySchema<T extends Schema> extends Schema<Output<T>[], Input<T>[]> {}
interface OptionalInternals<T extends Schema> extends Internals<Output<T> | undefined, Input<T> | undefined> {
    optionalOutput: true;
    optionalInput: true;
}
interface OptionalSchema<T extends Schema> extends Schema<Output<T> | undefined, Input<T> | undefined> {
    internals: OptionalInternals<T>;
}

type Shape = Record<string, Schema>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type ObjectOutput<S extends Shape> = Prettify<{
    [K in keyof S as S[K] extends { internals: { optionalOutput: true } } ? never : K]: Output<S[K]>;
} & {
    [K in keyof S as S[K] extends { internals: { optionalOutput: true } } ? K : never]?: Output<S[K]>;
}>;
type ObjectInput<S extends Shape> = Prettify<{
    [K in keyof S as S[K] extends { internals: { optionalInput: true } } ? never : K]: Input<S[K]>;
} & {
    [K in keyof S as S[K] extends { internals: { optionalInput: true } } ? K : never]?: Input<S[K]>;
}>;
interface ObjectSchema<S extends Shape> extends Schema<ObjectOutput<S>, ObjectInput<S>> {
    shape: S;
}

declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
declare function array<T extends Schema>(element: T): ArraySchema<T>;
declare function optional<T extends Schema>(element: T): OptionalSchema<T>;
declare function text(): TextSchema;

const node = object({
    name: text(),
    get children() { return array(node); },
});
declare const nodeOutput: Output<typeof node>;
declare const nodeInput: Input<typeof node>;
const outputName: string = nodeOutput.children[0].children[0].name;
const inputName: number = nodeInput.children[0].children[0].name;
const wrongOutput: number = nodeOutput.children[0].name;
const wrongInput: string = nodeInput.children[0].name;
nodeOutput.children[0].children[0].missing;

const user = object({
    name: text(),
    get posts() { return array(post); },
});
const post = object({
    title: text(),
    get author() { return user; },
});
declare const userOutput: Output<typeof user>;
const authorName: string = userOutput.posts[0].author.posts[0].author.name;
userOutput.posts[0].author.posts[0].missing;

const activity = object({
    name: text(),
    get children() { return optional(array(activity)); },
});
const emptyActivity: Output<typeof activity> = { name: "" };
declare const activityOutput: Output<typeof activity>;
const activityName: string = activityOutput.children![0].children![0].name;
activityOutput.children![0].children![0].missing;

const linked = object({
    name: text(),
    get children() { return optional(linkedArray); },
});
const linkedArray = array(linked);
declare const linkedOutput: Output<typeof linked>;
const linkedName: string = linkedOutput.children![0].children![0].name;
linkedOutput.children![0].children![0].missing;

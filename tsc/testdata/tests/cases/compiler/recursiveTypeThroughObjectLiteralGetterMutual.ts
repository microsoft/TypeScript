// @strict: true
// @noEmit: true

// Two schemas that name each other through getters, with the object's members reached through two
// separate key remappings -- one for the output side and one for the input side, each keyed on a
// different member of the schema's own internals.
//
// Both remappings read the member table of a type whose bases are still being inherited, and they
// read it at different points in that assembly. That is what makes this shape the one that separates
// the two answers a miss in that window can have. A speculative comparison has to decline, because
// the member it would force is the one its own question is about. An ordinary lookup has to finish
// itself against the base types still to be inherited, which is what keeps the window unobservable.
// Giving a speculative miss the second answer forces `posts` while its own return type is still
// being inferred, and the getter falls back to an implicit `any` -- so the two cannot be merged into
// one answer, and a single remapping does not reach the case.

interface Internals<out O = unknown, out I = unknown> {
    output: O;
    input: I;
    optin?: "optional" | undefined;
    optout?: "optional" | undefined;
}

interface Schema<out O = unknown, out I = unknown> {
    _zod: Internals<O, I>;
}

type output<T extends Schema> = T["_zod"]["output"];
type input<T extends Schema> = T["_zod"]["input"];

interface StringSchema extends Schema<string, string> {}
declare function text(): StringSchema;

interface ArraySchema<T extends Schema = Schema> extends Schema<output<T>[], input<T>[]> {}
declare function array<T extends Schema>(element: T): ArraySchema<T>;

type OptionalOutSchema = { _zod: { optout: "optional" } };
type OptionalInSchema = { _zod: { optin: "optional" } };
type Shape = Readonly<{ [k: string]: Schema }>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};

type ObjectOut<T extends Shape> = Prettify<
    {
        [k in keyof T as T[k] extends OptionalOutSchema ? never : k]: output<T[k]>;
    } & {
        [k in keyof T as T[k] extends OptionalOutSchema ? k : never]?: output<T[k]>;
    }
>;

type ObjectIn<T extends Shape> = Prettify<
    {
        [k in keyof T as T[k] extends OptionalInSchema ? never : k]: input<T[k]>;
    } & {
        [k in keyof T as T[k] extends OptionalInSchema ? k : never]?: input<T[k]>;
    }
>;

interface ObjectSchema<S extends Shape = Shape> extends Schema<ObjectOut<S>, ObjectIn<S>> {
    shape: S;
}
declare function object<T extends Shape>(shape: T): ObjectSchema<T>;

const user = object({
    email: text(),
    get posts() {
        return array(post);
    },
});

const post = object({
    title: text(),
    get author() {
        return user;
    },
});

type UserT = output<typeof user>;
declare const sampleUser: UserT;
// Every step of the cycle resolves, including the one that walks back to where it started. On main
// both declarations get an implicit `any` instead.
const email: string = sampleUser.email;
const postTitle: string = sampleUser.posts[0].title;
const authorEmail: string = sampleUser.posts[0].author.email;

// The printer elides a recursive reference as `any`, so a collapsed result prints the same as a
// resolved one. Reading a key neither schema declares is what tells them apart: it is an error here
// and permitted on `any`, so a collapse turns this directive into an unused one.
// @ts-expect-error
sampleUser.missing;

// @strict: true
// @noEmit: true

// Two schemas naming each other through getters, with the object's members reached through two separate
// key remappings, one per variance side, each keyed on a different member of the internals.
//
// Both remappings read the member table of a type whose bases are still being inherited, at different
// points in that assembly, which is what makes this shape separate the two answers a miss can have. A
// speculative comparison must decline, since the member it would force is the subject of its own
// question. An ordinary lookup must resolve against the bases still to be inherited. Giving a speculative
// miss the second answer forces `posts` mid-inference and the getter falls back to an implicit `any`. A
// single remapping does not reach this.

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

// @strict: true
// @noEmit: true

// Children<S> always produces a Record, so it satisfies NeedsRecord. Its
// true branch narrows S["states"] to Record<string, Schema> even when S is
// a conditional type that is itself deferred.

interface Schema {
    states?: Record<string, Schema>;
}
type Resolve<S extends Record<string, Schema>, Segments extends readonly string[]> =
    Segments extends [infer Head extends string, ...infer Rest extends string[]]
        ? Head extends keyof S
            ? Rest extends []
                ? S[Head]
                : S[Head]["states"] extends Record<string, Schema>
                    ? Resolve<S[Head]["states"], Rest>
                    : never
            : never
        : never;
type Split<P extends string> = P extends `${infer Head}.${infer Tail}` ? [Head, Tail] : [P];
type Children<S extends Schema> = S["states"] extends Record<string, Schema> ? S["states"] : Record<string, Schema>;
type NeedsRecord<T extends Record<string, Schema>> = T;
type ChildrenAt<S extends Record<string, Schema>, P extends string> = NeedsRecord<Children<Resolve<S, Split<P>>>>;

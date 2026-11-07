// @strict: true
// @noEmit: true

// Variances of these mutually recursive generics must not depend on values
// measured mid-cycle. Assigning `e` to `EntryPoint<any, any>` must agree with
// assigning `e.root` to `EntryPoint<any, any>["root"]`.

interface Query {}
type Component<P> = P | ((props: P) => void);
interface Ref<T> {
    value: T;
}
interface Rep<Params, Queries extends Record<string, Query>, Nested, Runtime, Extra> extends Readonly<{
    root: Ref<EntryPointComponent<Queries, Nested, Runtime>>;
}> {}
type Preloaded<T> = T extends Record<string, Rep<any, any, any, any, any>> ? { [K in keyof T]: Unwrap<GetComponent<T>> } : never;
interface Props<Queries, Nested, Runtime, Extra> extends Readonly<{
    nested: Preloaded<Nested>;
    queries: Queries;
}> {}
type EntryPointComponent<Queries extends Record<string, Query>, Nested, Runtime, Extra = {}> = Component<Props<Queries, Nested, Runtime, Extra>>;
type Unwrap<C> = C extends EntryPointComponent<infer Q, infer N, infer R> ? Readonly<{}> : {};
type EntryPoint<C, Params> = Rep<Params, C extends EntryPointComponent<infer Q, any, any> ? Q : never, never, never, never>;
type GetComponent<T> = T extends EntryPoint<infer C, infer P> ? C : never;

declare const c: EntryPointComponent<{ q: { readonly variables: { slug: string } } }, {}, { onClick: () => void }>;
declare const e: EntryPoint<typeof c, { slug: string }>;
const whole: EntryPoint<any, any> = e;
const root: EntryPoint<any, any>["root"] = e.root;

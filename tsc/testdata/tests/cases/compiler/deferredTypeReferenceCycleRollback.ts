// @strict: true
// @noEmit: true

// A cycle rollback used to reset the type of the Array<NodePath<unknown>>
// node while the deferred reference identified by that node survived,
// which crashed a later instantiation of it.

declare function declare<T extends PluginObj = PluginObj>(): void;

interface PluginObj<S = unknown> {
    visitor: Visit<S, never>;
}
type Visit<S, P> = VisitFn<S, P> | VisitObj<S, P>;
type VisitFn<S, P> = (path: NodePath<P>) => void;
interface VisitObj<S, P> {}
declare class NodePath<T> {
    parentPath: NodePath<Exclude<T, null>>;
    get: Get<T>;
}
type Get<T> = T extends Array<Missing> ? Array<NodePath<unknown>> : never;

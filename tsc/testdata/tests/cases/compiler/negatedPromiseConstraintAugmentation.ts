// @target: esnext
// @lib: esnext
// @strict: true
// @noEmit: true

// @filename: augmentation.d.ts
interface Promise<T> {
    communityMethod(): T;
}

interface Promise<T extends not { then(): any }> {
    anotherCommunityMethod(): T;
}

// @filename: main.ts
type Value = number & not { then(): any };
declare const value: Value;
const promise = Promise.resolve(value);
const first: Value = promise.communityMethod();
const second: Value = promise.anotherCommunityMethod();
type NestedPromise = Promise<Promise<Value>>;

interface UnconstrainedFirst<T> {
    value: T;
}
interface UnconstrainedFirst<T extends not { then(): any }> {}
type ValidUnconstrainedFirst = UnconstrainedFirst<Value>;
type NestedUnconstrainedFirst = UnconstrainedFirst<Promise<Value>>;

interface ConstrainedFirst<T extends not { then(): any }> {
    value: T;
}
interface ConstrainedFirst<T> {}
type ValidConstrainedFirst = ConstrainedFirst<Value>;
type NestedConstrainedFirst = ConstrainedFirst<Promise<Value>>;

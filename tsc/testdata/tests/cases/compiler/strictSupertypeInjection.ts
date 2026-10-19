// @strict: true
// @noEmit: true

interface Reference<Value> {
    get value(): Value;
    set value(value: Value);
}
interface ComputedReference<Value> extends Reference<Value> {
    readonly value: Value;
    effect: unknown;
}
interface InjectionConstraint<Value> {}
type InjectionKey<Value> = symbol & InjectionConstraint<Value>;

declare function inject<Value>(key: InjectionKey<Value> | string, fallback: Value): Value;
declare function ref<Value = any>(): Reference<Value | undefined>;
declare const key: InjectionKey<{ visibleIds: ComputedReference<unknown> }>;

const visibleIds = inject(key, { visibleIds: ref() }).visibleIds;

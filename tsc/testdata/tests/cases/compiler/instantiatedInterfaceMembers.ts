// @strict: true
// @declaration: true

class Base<T> {
    value!: T;
    protected hidden!: T;
    fluent(): this {
        return this;
    }
}

interface Derived<T> extends Base<T> {
    extra: T;
}

interface Further<T> extends Derived<T> {
    another: T;
}

declare const further: Further<string>;
export const fluent: Further<string> = further.fluent();
const wrongValue: number = further.value;
further.hidden;
further.missing;

interface Callable<T> {
    (value: T): T;
    new (value: T): Base<T>;
    [key: string]: T;
}

interface CallableDerived<T> extends Callable<T> {
    value: T;
}

declare const callable: CallableDerived<string>;
export const call: string = callable("");
export const construct: Base<string> = new callable("");
export const index: string = callable["other"];
callable(0);
new callable(0);

declare function mixin<C extends new (...args: any[]) => any>(base: C): C & {
    new (...args: any[]): { added: number };
};

export function factory<T>() {
    class Mixed extends mixin(Base<T>) {}
    interface Result extends Mixed {
        extra: T;
    }
    return null! as Result;
}

export const mixed = factory<string>();
export const inherited: string = mixed.value;
export const added: number = mixed.added;
export const mixedFluent: typeof mixed = mixed.fluent();

interface Computed<T extends { value: unknown }> extends Base<T["value"]> {
    extra: T["value"];
}
interface ComputedFurther<T extends { value: unknown }> extends Computed<T> {
    another: T["value"];
}
declare const computed: ComputedFurther<{ value: string }>;
export const computedFluent: typeof computed = computed.fluent();
export const computedValue: string = computed.value;
const wrongComputedValue: number = computed.value;
computed.hidden;
computed.missing;

interface ComputedCallable<T extends { value: unknown }> extends Callable<T["value"]> {
    value: T["value"];
}
declare const computedCallable: ComputedCallable<{ value: string }>;
export const computedCall: string = computedCallable("");
export const computedConstruct: Base<string> = new computedCallable("");
export const computedIndex: string = computedCallable["other"];
computedCallable(0);
new computedCallable(0);

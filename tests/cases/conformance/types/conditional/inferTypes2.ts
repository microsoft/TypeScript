// @strict: true
// @declaration: true

// Repro from #22755

export declare function foo<T>(obj: T): T extends () => infer P ? P : never;
export function bar<T>(obj: T) {
    return foo(obj);
}

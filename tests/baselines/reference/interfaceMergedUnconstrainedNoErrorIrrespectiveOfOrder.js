//// [tests/cases/compiler/interfaceMergedUnconstrainedNoErrorIrrespectiveOfOrder.ts] ////

//// [working.ts]
// minimal samples from #33395
export namespace ns {
    interface Function<T extends (...args: any) => any> {
        throttle(): Function<T>;
    }
    interface Function<T> {
        unary(): Function<() => ReturnType<T>>;
    }
}
//// [regression.ts]
export namespace ns {
    interface Function<T> {
        unary(): Function<() => ReturnType<T>>;
    }
    interface Function<T extends (...args: any) => any> {
        throttle(): Function<T>;
    }
}

//// [working.js]
export {};
//// [regression.js]
export {};

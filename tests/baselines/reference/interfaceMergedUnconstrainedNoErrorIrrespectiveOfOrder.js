//// [tests/cases/compiler/interfaceMergedUnconstrainedNoErrorIrrespectiveOfOrder.ts] ////

//// [working.ts]
// minmal samples from #33395
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
"use strict";
exports.__esModule = true;
//// [regression.js]
"use strict";
exports.__esModule = true;

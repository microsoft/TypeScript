// @filename: working.ts
// minmal samples from #33395
export namespace ns {
    interface Function<T extends (...args: any) => any> {
        throttle(): Function<T>;
    }
    interface Function<T> {
        unary(): Function<() => ReturnType<T>>;
    }
}
// @filename: regression.ts
export namespace ns {
    interface Function<T> {
        unary(): Function<() => ReturnType<T>>;
    }
    interface Function<T extends (...args: any) => any> {
        throttle(): Function<T>;
    }
}
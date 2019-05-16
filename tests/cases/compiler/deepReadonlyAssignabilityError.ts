type DeepReadonly<T> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
}

declare function f2<T>(x: DeepReadonly<T>): (x: T) => void;

/**
 * This produces a function whose argument type is a deeply recursive reverse mapped type
 */
const result = f2({ x: { y: { z: { a: { b: { c: 12 } } } } } });

result({
    x: {
        y: {
            
        }
    }
});

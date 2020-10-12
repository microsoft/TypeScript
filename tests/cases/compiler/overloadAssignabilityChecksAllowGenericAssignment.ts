declare function provide<T>(cb: (x: T) => void): void;
declare function provide<T>(cb: (x: T[keyof T]) => void): void;

declare function provider<T>(provide: (cb: (x: T) => void) => void): void;
provider(provide);
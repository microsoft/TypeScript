// @strict: true
// @noEmit: true

declare function useCallback<T extends Function>(fn: T): T;

declare function ex1(callback: (x: number) => void): void;
ex1(useCallback(x => {}));

declare function ex2(callback?: (x: number) => void): void;
ex2(useCallback(x => {}));

declare function ex3(callback: ((x: number) => void) | 5): void;
ex3(useCallback(x => {}));

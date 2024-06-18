// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/50719

declare function useCallback1<T extends Function>(fn: T): T;

declare function ex2(callback?: (x: number) => void): void;
ex2(useCallback1((x) => {}));

declare function ex3(callback: ((x: number) => void) | 5): void;
ex3(useCallback1((x) => {}));

// https://github.com/microsoft/TypeScript/issues/41461

declare function useCallback2<T extends (...args: any[]) => any>(
  callback: T,
): T;
const test: ((x: string) => void) | undefined = useCallback2((x) => {});

// @strict: true
// @noEmit: true
// @jsx: preserve

/// <reference path="/.lib/react16.d.ts" />

// repro #51577

declare function omit<T, K extends string>(names: readonly K[], obj: T): Omit<T, K>;
declare function omit<K extends string>(names: readonly K[]): <T>(obj: T) => Omit<T, K>;

declare const otherProps: { bar: string, qwe: boolean }

declare function GenericComponent<T>(props: T): null

<GenericComponent {...omit(['bar'], otherProps)} />; // no error



// @strict: true
// @noEmit: true

declare function constrained<T extends string>(): void;
constrained<number>();

declare function dependent<T extends U, U>(): void;
dependent<number, string>();

declare function dependentObject<T extends U, U>(): void;
dependentObject<{ value: number }, { value: string }>();

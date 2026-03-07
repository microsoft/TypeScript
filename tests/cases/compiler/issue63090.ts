type N<T, K extends string> = T | { [P in K]: N<keyof T, K> }[K];
type M = N<number, "M">;

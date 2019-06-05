// https://github.com/Microsoft/TypeScript/issues/26240

type OnlyNumber<T extends number> = T;
type ToNumber<T extends number | string> =
    T extends string ? undefined : OnlyNumber<T>;

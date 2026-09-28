// @strict: true
// @noEmit: true

type Partition<T, U> = Extract<T, U> | Exclude<T, U>;

function partition<T, U>(value: T): Partition<T, U> {
    return value;
}

function identity<T, U>(value: Partition<T, U>): T {
    return value;
}

function unionPartition<T, A, B>(value: T): Extract<T, A | B> | Exclude<T, A | B> {
    return value;
}

const extractedUnknown: Extract<unknown, string> = "chosen";
const extractedLiteral: Extract<string, "chosen"> = "chosen";
const excludedLiteral: Exclude<string, "chosen"> = "other";
const excludedChosen: Exclude<string, "chosen"> = "chosen";

const extractedAny: Extract<any, string> = 123;
const excludedAny: Exclude<any, string> = "chosen";
const extractedNever: Extract<string, never> = "chosen";
const excludedUnknown: Exclude<string, unknown> = "chosen";

type Props = { owner: string; count: number };
const omitted: Omit<Props, "owner"> = { count: 1 };
const restored: Props = { ...omitted, owner: "chosen" };

declare function withOwner<T extends { owner: string }>(props: Omit<T, "owner"> & { owner: string }): T;

function render<T extends { owner: string }>(props: T): T {
    return withOwner<T>(props);
}

type Product = { kind: "a"; value: 0 } | { kind: "b"; value: 1 };
type DoubleExcluded = {
    [Kind in Product["kind"]]: Exclude<Product, Exclude<Product, { kind: Kind }>>;
};
const productA: DoubleExcluded["a"] = { kind: "a", value: 0 };
const productB: DoubleExcluded["b"] = { kind: "b", value: 1 };
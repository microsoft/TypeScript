// @strict: true
// @noEmit: true

type Item = {
    attribute: string;
};

declare const result: Partial<Record<"attribute", string | null>>;

const item: Item = {
    attribute: "",
    ...result,
};

const item2: Item = {
    ...result,
    attribute: "",
};

const item3: Item = {
    attribute: null,
};

// @strict: true

interface Item {
    field: "a" | "b" | "c";
}

interface First {
    kind: "first";
}

interface Last {
    kind: "last";
}

declare const condition: boolean;
declare const optionalItems: Item[] | undefined;
declare const nullableItems: Item[] | null;

const direct: Item[] = [
    ...[
        { field: "a" },
        { field: "b" },
    ],
];

const conditional: Item[] = [
    ...(condition ? [{ field: "a" }] : [{ field: "b" }]),
];

const tuple: [First, Item, Last] = [
    { kind: "first" },
    ...[{ field: "a" }],
    { kind: "last" },
];

const tupleFromSingleSpread: [First, Last] = [
    ...[
        { kind: "first" },
        { kind: "last" },
    ],
];

const multipleSpreads: Item[] = [
    ...[{ field: "a" }],
    ...[{ field: "b" }],
];

declare function acceptItems(...items: Item[]): void;
declare function acceptPair(first: First, last: Last): void;
declare function acceptTriple(first: First, item: Item, last: Last): void;

acceptItems(...[{ field: "a" }, { field: "b" }]);
acceptItems(...(condition ? [{ field: "a" }] : [{ field: "b" }]));
acceptPair(...[{ kind: "first" }, { kind: "last" }]);
acceptTriple(...[{ kind: "first" }, { field: "a" }], ...[{ kind: "last" }]);

acceptItems(...(optionalItems || [{ field: "a" }]));
acceptItems(...(nullableItems ?? [{ field: "b" }]));

const invalid: Item[] = [...[{ field: "not-an-item" }]];
acceptItems(...(optionalItems || [{ field: "not-an-item" }]));
acceptItems(...(nullableItems ?? [{ field: "not-an-item" }]));

//// [tests/cases/compiler/contextualTypingArraySpreadElements.ts] ////

//// [contextualTypingArraySpreadElements.ts]
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

acceptItems(...[{ field: "a" }, { field: "b" }]);
acceptItems(...(condition ? [{ field: "a" }] : [{ field: "b" }]));
acceptPair(...[{ kind: "first" }, { kind: "last" }]);

const invalid: Item[] = [...[{ field: "not-an-item" }]];


//// [contextualTypingArraySpreadElements.js]
"use strict";
const direct = [
    ...[
        { field: "a" },
        { field: "b" },
    ],
];
const conditional = [
    ...(condition ? [{ field: "a" }] : [{ field: "b" }]),
];
const tuple = [
    { kind: "first" },
    ...[{ field: "a" }],
    { kind: "last" },
];
const tupleFromSingleSpread = [
    ...[
        { kind: "first" },
        { kind: "last" },
    ],
];
const multipleSpreads = [
    ...[{ field: "a" }],
    ...[{ field: "b" }],
];
acceptItems(...[{ field: "a" }, { field: "b" }]);
acceptItems(...(condition ? [{ field: "a" }] : [{ field: "b" }]));
acceptPair(...[{ kind: "first" }, { kind: "last" }]);
const invalid = [...[{ field: "not-an-item" }]];

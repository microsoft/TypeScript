//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_ensureInterfaceImpl.ts] ////

//// [typeSatisfaction_ensureInterfaceImpl.ts]
type Movable = {
    move(distance: number): void;
};

const car = {
    start() { },
    move(d) {
        // d should be number
    },
    stop() { }
} satisfies Movable & Record<string, unknown>;


//// [typeSatisfaction_ensureInterfaceImpl.js]
const car = {
    start() { },
    move(d) {
        // d should be number
    },
    stop() { }
};

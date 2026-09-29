// @strict: true
// @noEmit: true

interface Reference {
    target: object;
}

interface TupleReference extends Reference {
    target: { elements: number[] };
}

declare function isArrayReference(value: object): value is Reference;
declare function isTupleReference(value: object): value is TupleReference;
declare function acceptsNotReference(value: not Reference): void;

function checkReference(value: object) {
    if (isArrayReference(value)) {
        return;
    }
    acceptsNotReference(value);
    if (isTupleReference(value)) {
        value.target.elements;
    }
}

function checkProperty(container: { value: object }) {
    if (!isArrayReference(container.value) && isTupleReference(container.value)) {
        container.value.target.elements;
    }
}

declare function isSmallNumber(value: unknown): value is number;
function checkUnknown(value: unknown) {
    if (!isSmallNumber(value) && typeof value === "number") {
        value.toFixed();
    }
}
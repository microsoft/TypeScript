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

// Partial predicates are treated as invertible, so their false branches exclude subtypes too.
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

// Check the more specific predicate first to avoid excluding tuple references with the array check.
function checkTupleBeforeArray(value: object) {
    if (isTupleReference(value)) {
        return value.target.elements;
    }
    if (isArrayReference(value)) {
        return value.target;
    }
}

function checkTupleBeforeArrayInCondition(value: object) {
    if (isTupleReference(value) && value.target.elements.length || isArrayReference(value)) {
        return value.target;
    }
}
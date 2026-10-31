// @strict: true

function directAssignment() {
    let value: number;
    value = 1;
}

function parenthesizedAssignment() {
    let value: number;
    (value) = 1;
}

function asAssignment() {
    let value: number;
    (value as number) = 1;
}

function typeAssertionAssignment() {
    let value: number;
    (<number>value) = 1;
}

function nestedAssertionAssignment() {
    let value: number;
    ((<number>value) as number) = 1;
}

function readBeforeAssignment() {
    let value: number;
    return value as number;
}

function compoundAssignmentBeforeInitialization() {
    let value: number;
    (value as number) += 1;
}

function incrementBeforeInitialization() {
    let value: number;
    ++(<number>value);
}

function decrementBeforeInitialization() {
    let value: number;
    (value as number)--;
}

function initializedCompoundAssignments() {
    let value = 1;
    (value as number) += 1;
    ++(<number>value);
    (value as number)--;
}

function constAssignment() {
    const value = 1;
    (value as any) = 2;
    (<any>value) = 3;
}

function readonlyPropertyAssignment() {
    const object: { readonly value: number } = { value: 1 };
    (object.value as number) = 2;
    (<number>object["value"]) = 3;
}

function mutableObjectAssertion() {
    const object: { readonly value: number } = { value: 1 };
    (object as { value: number }).value = 2;
}

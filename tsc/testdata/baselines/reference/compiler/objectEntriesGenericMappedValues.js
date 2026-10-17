//// [tests/cases/compiler/objectEntriesGenericMappedValues.ts] ////

//// [objectEntriesGenericMappedValues.ts]
function read<T extends { tabIndex: number }>(attributes: Partial<T>) {
    const [, value] = Object.entries(attributes)[0];
    Object.entries(value);
    const tabIndex: number = value;
}


//// [objectEntriesGenericMappedValues.js]
"use strict";
function read(attributes) {
    const [, value] = Object.entries(attributes)[0];
    Object.entries(value);
    const tabIndex = value;
}

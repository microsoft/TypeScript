//// [tests/cases/compiler/quickinfoTypeAtReturnPositionsInaccurate.ts] ////

//// [quickinfoTypeAtReturnPositionsInaccurate.ts]
class NumClass<T extends number> {
    private value!: T;
    public get(): T {
        return this.value;
    }
    public numExclusive() { }
}

class StrClass<T extends string> {
    private value!: T;
    public get(): T {
        return this.value;
    }
    public strExclusive() { }
}

const isNumClass = <Item extends NumClass<number> | StrClass<string>> (
        item: Item
    ): item is Extract<Item, NumClass<any>> => {
        return (item instanceof NumClass);
    }

/**
 * An example with one dimensional dictionary. Everything worked ok here, even in prior
 * versions.
 */
class SimpleStore<Entries extends { [index: string]: NumClass<number> | StrClass<string> }> {
    private entries = { } as Entries;

    public get<EntryId extends keyof Entries>(entryId: EntryId): Entries[EntryId] {
        let entry = this.entries[entryId];

        entry.numExclusive(); // error - expected.

        if (isNumClass(entry)) {
            entry.numExclusive(); // works
            return entry;
        }

        return entry; // type is Entries[EntryId] - all fine
    }
}

type Slice = {
    [index: string]: NumClass<number> | StrClass<string>
}

/**
 * A an example with 2-dimensional dictionary.
 * 
 * In v4.1 the `isNumClass` type guard doesn't work at all.
 * In v4.2 or later, `isNumClass` type guard leaks outside its
 * scope.
 */
class ComplexStore<Slices extends { [index: string]: Slice }> {
    private slices = { } as Slices;

    public get<SliceId extends keyof Slices, SliceKey extends keyof Slices[SliceId]>(
        sliceId: SliceId, sliceKey: SliceKey
    ): Slices[SliceId][SliceKey] {
        let item = this.slices[sliceId][sliceKey];

        if (isNumClass(item)) {
            item.numExclusive(); // works only since version 4.2
        }

        item.get();

        // unfortunately, doesn't work completely.
        // it seems like item's predicated type leaks outside the bracket...
        
        return item; // type is Extract ...
    }

    public get2<SliceId extends keyof Slices, SliceKey extends keyof Slices[SliceId]>(
        sliceId: SliceId, sliceKey: SliceKey
    ): Slices[SliceId][SliceKey] {
        let item = this.slices[sliceId][sliceKey];

        if (isNumClass(item)) {
            return item;
        }
        // it seems like the compiler asumes the above condition is always
        // truthy

        item.get();

        return item; // type is never
    }
}

// from the compiler itself
interface BuilderProgram {
    getProgram(): Program;
}
interface Program {
    state: any;
}
declare function isBuilderProgram<T extends BuilderProgram>(program: Program | T): program is T;
export function listFiles<T extends BuilderProgram>(program: Program | T) {
    const x: Program = isBuilderProgram(program) ? program.getProgram() : program;
}

//// [quickinfoTypeAtReturnPositionsInaccurate.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = listFiles;
var NumClass = /** @class */ (function () {
    function NumClass() {
    }
    NumClass.prototype.get = function () {
        return this.value;
    };
    NumClass.prototype.numExclusive = function () { };
    return NumClass;
}());
var StrClass = /** @class */ (function () {
    function StrClass() {
    }
    StrClass.prototype.get = function () {
        return this.value;
    };
    StrClass.prototype.strExclusive = function () { };
    return StrClass;
}());
var isNumClass = function (item) {
    return (item instanceof NumClass);
};
/**
 * An example with one dimensional dictionary. Everything worked ok here, even in prior
 * versions.
 */
var SimpleStore = /** @class */ (function () {
    function SimpleStore() {
        this.entries = {};
    }
    SimpleStore.prototype.get = function (entryId) {
        var entry = this.entries[entryId];
        entry.numExclusive(); // error - expected.
        if (isNumClass(entry)) {
            entry.numExclusive(); // works
            return entry;
        }
        return entry; // type is Entries[EntryId] - all fine
    };
    return SimpleStore;
}());
/**
 * A an example with 2-dimensional dictionary.
 *
 * In v4.1 the `isNumClass` type guard doesn't work at all.
 * In v4.2 or later, `isNumClass` type guard leaks outside its
 * scope.
 */
var ComplexStore = /** @class */ (function () {
    function ComplexStore() {
        this.slices = {};
    }
    ComplexStore.prototype.get = function (sliceId, sliceKey) {
        var item = this.slices[sliceId][sliceKey];
        if (isNumClass(item)) {
            item.numExclusive(); // works only since version 4.2
        }
        item.get();
        // unfortunately, doesn't work completely.
        // it seems like item's predicated type leaks outside the bracket...
        return item; // type is Extract ...
    };
    ComplexStore.prototype.get2 = function (sliceId, sliceKey) {
        var item = this.slices[sliceId][sliceKey];
        if (isNumClass(item)) {
            return item;
        }
        // it seems like the compiler asumes the above condition is always
        // truthy
        item.get();
        return item; // type is never
    };
    return ComplexStore;
}());
function listFiles(program) {
    var x = isBuilderProgram(program) ? program.getProgram() : program;
}

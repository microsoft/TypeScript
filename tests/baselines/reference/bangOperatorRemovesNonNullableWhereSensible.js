//// [bangOperatorRemovesNonNullableWhereSensible.ts]
export class Entry<T extends Table> {
    private _table: T | null = null;
    createSubsetForDirectory(): void {
        const entry = new Entry<T>();
        this._table!.fn(entry);
    }
}

export abstract class Table {
    fn(directoryEntry: Entry<this>): this | null {
        return null;
    }
}

//// [bangOperatorRemovesNonNullableWhereSensible.js]
"use strict";
exports.__esModule = true;
var Entry = /** @class */ (function () {
    function Entry() {
        this._table = null;
    }
    Entry.prototype.createSubsetForDirectory = function () {
        var entry = new Entry();
        this._table.fn(entry);
    };
    return Entry;
}());
exports.Entry = Entry;
var Table = /** @class */ (function () {
    function Table() {
    }
    Table.prototype.fn = function (directoryEntry) {
        return null;
    };
    return Table;
}());
exports.Table = Table;

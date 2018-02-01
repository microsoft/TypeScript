"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
/* @internal */
class FSWatcherEntrySet extends Set {
    constructor(path) {
        super();
        this.path = path;
        this._recursiveCount = 0;
        this._nonRecursiveCount = 0;
    }
    get recursiveCount() { return this._recursiveCount; }
    get nonRecursiveCount() { return this._nonRecursiveCount; }
    add(entry) {
        const size = this.size;
        super.add(entry);
        if (this.size !== size) {
            if (entry.recursive) {
                this._recursiveCount++;
            }
            else {
                this._nonRecursiveCount++;
            }
        }
        return this;
    }
    delete(entry) {
        if (super.delete(entry)) {
            if (entry.recursive) {
                this._recursiveCount--;
            }
            else {
                this._nonRecursiveCount--;
            }
            return true;
        }
        return false;
    }
    clear() {
        this._recursiveCount = 0;
        this._nonRecursiveCount = 0;
    }
}
exports.FSWatcherEntrySet = FSWatcherEntrySet;
class FSWatcher extends events.EventEmitter {
    constructor(fs) {
        super();
        this._fs = fs;
    }
    close() {
        if (this._entry) {
            this._fs["_removeWatcher"](this._entry);
        }
    }
}
exports.FSWatcher = FSWatcher;
// #endregion FSWatcher Event "error"

//# sourceMappingURL=watcher.js.map

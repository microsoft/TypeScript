import * as events from "events";
import { FileSystem } from "./fileSystem";
import { Stats } from "./stats";

/* @internal */
export interface FSWatcherEntry {
    watcher: FSWatcher;
    path: string;
    container: FSWatcherEntrySet;
    recursive: boolean;
}

/* @internal */
export class FSWatcherEntrySet extends Set<FSWatcherEntry> {
    private _recursiveCount: number;
    private _nonRecursiveCount: number;

    public readonly path: string;

    constructor(path: string) {
        super();
        this.path = path;
        this._recursiveCount = 0;
        this._nonRecursiveCount = 0;
    }

    public get recursiveCount() { return this._recursiveCount; }
    public get nonRecursiveCount() { return this._nonRecursiveCount; }

    public add(entry: FSWatcherEntry) {
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

    public delete(entry: FSWatcherEntry) {
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

    public clear() {
        this._recursiveCount = 0;
        this._nonRecursiveCount = 0;
    }
}

/* @internal */
export interface WatchedFile {
    path: string;
    handle: any;
    previous: Stats;
    listener: (current: Stats, previous: Stats) => void;
}

export class FSWatcher extends events.EventEmitter {
    private _fs: FileSystem;
    private _entry: FSWatcherEntry | undefined;

    constructor(fs: FileSystem) {
        super();
        this._fs = fs;
    }

    public close(): void {
        if (this._entry) {
            this._fs["_removeWatcher"](this._entry);
        }
    }
}

// #region FSWatcher Event "change"
export interface FSWatcher {
    on(event: "change", listener: (eventType: string, filename: string) => void): this;
    once(event: "change", listener: (eventType: string, filename: string) => void): this;
    addListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    removeListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    prependListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    prependOnceListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    emit(name: "change", eventType: string, filename: string): boolean;
}
// #endregion FSWatcher Event "change"

// #region FSWatcher Event "error"
export interface FSWatcher {
    on(event: "error", listener: (error: Error) => void): this;
    once(event: "error", listener: (error: Error) => void): this;
    addListener(event: "error", listener: (error: Error) => void): this;
    removeListener(event: "error", listener: (error: Error) => void): this;
    prependListener(event: "error", listener: (error: Error) => void): this;
    prependOnceListener(event: "error", listener: (error: Error) => void): this;
    emit(name: "error", error: Error): boolean;
}
// #endregion FSWatcher Event "error"
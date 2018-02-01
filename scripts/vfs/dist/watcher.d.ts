/// <reference types="node" />
import * as events from "events";
import { FileSystem } from "./fileSystem";
import { Stats } from "./stats";
export interface FSWatcherEntry {
    watcher: FSWatcher;
    path: string;
    container: FSWatcherEntrySet;
    recursive: boolean;
}
export declare class FSWatcherEntrySet extends Set<FSWatcherEntry> {
    private _recursiveCount;
    private _nonRecursiveCount;
    readonly path: string;
    constructor(path: string);
    readonly recursiveCount: number;
    readonly nonRecursiveCount: number;
    add(entry: FSWatcherEntry): this;
    delete(entry: FSWatcherEntry): boolean;
    clear(): void;
}
export interface WatchedFile {
    path: string;
    handle: any;
    previous: Stats;
    listener: (current: Stats, previous: Stats) => void;
}
export declare class FSWatcher extends events.EventEmitter {
    private _fs;
    private _entry;
    constructor(fs: FileSystem);
    close(): void;
}
export interface FSWatcher {
    on(event: "change", listener: (eventType: string, filename: string) => void): this;
    once(event: "change", listener: (eventType: string, filename: string) => void): this;
    addListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    removeListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    prependListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    prependOnceListener(event: "change", listener: (eventType: string, filename: string) => void): this;
    emit(name: "change", eventType: string, filename: string): boolean;
}
export interface FSWatcher {
    on(event: "error", listener: (error: Error) => void): this;
    once(event: "error", listener: (error: Error) => void): this;
    addListener(event: "error", listener: (error: Error) => void): this;
    removeListener(event: "error", listener: (error: Error) => void): this;
    prependListener(event: "error", listener: (error: Error) => void): this;
    prependOnceListener(event: "error", listener: (error: Error) => void): this;
    emit(name: "error", error: Error): boolean;
}

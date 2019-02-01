import { TaskFunction } from "gulp";

declare module "gulp-clone" {
    function Clone(): NodeJS.ReadWriteStream;
    namespace Clone {
        export function sink() : NodeJS.ReadWriteStream & {tap: () => NodeJS.ReadWriteStream};
    }
    export = Clone;
}

declare module "gulp-insert" {
    export function append(text: string | Buffer): NodeJS.ReadWriteStream;
    export function prepend(text: string | Buffer): NodeJS.ReadWriteStream;
    export function wrap(text: string | Buffer, tail: string | Buffer): NodeJS.ReadWriteStream;
    export function transform(cb: (contents: string, file: {path: string, relative: string}) => string): NodeJS.ReadWriteStream; // file is a vinyl file
}

declare module "sorcery";

declare module "vinyl" {
    // NOTE: This makes it possible to correctly type vinyl Files under @ts-check.
    export = File;

    declare class File<T extends File.Contents = File.Contents> {
        constructor(options?: File.VinylOptions<T>);

        cwd: string;
        base: string;
        path: string;
        readonly history: ReadonlyArray<string>;
        contents: T;
        relative: string;
        dirname: string;
        basename: string;
        stem: string;
        extname: string;
        symlink: string | null;
        stat: import("fs").Stats | null;
        sourceMap?: import("./sourcemaps").RawSourceMap | string;

        [custom: string]: any;

        isBuffer(): this is T extends Buffer ? File<Buffer> : never;
        isStream(): this is T extends NodeJS.ReadableStream ? File<NodeJS.ReadableStream> : never;
        isNull(): this is T extends null ? File<null> : never;
        isDirectory(): this is T extends null ? File.Directory : never;
        isSymbolic(): this is T extends null ? File.Symbolic : never;
        clone(opts?: { contents?: boolean, deep?: boolean }): this;
    }

    namespace File {
        export interface VinylOptions<T extends Contents = Contents> {
            cwd?: string;
            base?: string;
            path?: string;
            history?: ReadonlyArray<string>;
            stat?: import("fs").Stats;
            contents?: T;
            sourceMap?: import("./sourcemaps").RawSourceMap | string;
            [custom: string]: any;
        }

        export type Contents = Buffer | NodeJS.ReadableStream | null;
        export type File = import("./vinyl");
        export type NullFile = File<null>;
        export type BufferFile = File<Buffer>;
        export type StreamFile = File<NodeJS.ReadableStream>;

        export interface Directory extends NullFile {
            isNull(): true;
            isDirectory(): true;
            isSymbolic(): this is never;
        }

        export interface Symbolic extends NullFile {
            isNull(): true;
            isDirectory(): this is never;
            isSymbolic(): true;
        }
    }
}

declare module "undertaker" {
    interface TaskFunctionParams {
        flags?: Record<string, string>;
    }
}

declare module "gulp-sourcemaps" {
    interface WriteOptions {
        destPath?: string;
    }
}
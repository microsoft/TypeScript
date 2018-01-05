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
declare module "travis-fold";

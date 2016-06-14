declare module "gulp-insert" {
    export function append(text: string | Buffer): NodeJS.ReadWriteStream;
    export function prepend(text: string | Buffer): NodeJS.ReadWriteStream;
    export function wrap(text: string | Buffer, tail: string | Buffer): NodeJS.ReadWriteStream;
    export function transform(cb: (contents: string, file: {path: string}) => string): NodeJS.ReadWriteStream; // file is a vinyl file
}

declare module "vinyl-transform" {
    type TransformFn = (filename: string) => NodeJS.ReadableStream; 
    function transform(transformFn: TransformFn): NodeJS.ReadWriteStream;
    export = transform;
}
/////////////////////////////
/// Worker Async Iterable APIs
/////////////////////////////

interface FileSystemDirectoryHandle {
    [Symbol.asyncIterator](): BuiltinAsyncIterator<[string, FileSystemHandle]>;
    entries(): BuiltinAsyncIterator<[string, FileSystemHandle]>;
    keys(): BuiltinAsyncIterator<string>;
    values(): BuiltinAsyncIterator<FileSystemHandle>;
}

interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): BuiltinAsyncIterator<R>;
    values(options?: ReadableStreamIteratorOptions): BuiltinAsyncIterator<R>;
}

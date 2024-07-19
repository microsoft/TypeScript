/////////////////////////////
/// Window Async Iterable APIs
/////////////////////////////

interface FileSystemDirectoryHandle {
    [Symbol.asyncIterator](): AsyncBuiltinIterator<[string, FileSystemHandle], BuiltinIteratorReturn>;
    entries(): AsyncBuiltinIterator<[string, FileSystemHandle], BuiltinIteratorReturn>;
    keys(): AsyncBuiltinIterator<string, BuiltinIteratorReturn>;
    values(): AsyncBuiltinIterator<FileSystemHandle, BuiltinIteratorReturn>;
}

interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): AsyncBuiltinIterator<R, BuiltinIteratorReturn>;
    values(options?: ReadableStreamIteratorOptions): AsyncBuiltinIterator<R, BuiltinIteratorReturn>;
}

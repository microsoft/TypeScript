/////////////////////////////
/// Window Async Iterable APIs
/////////////////////////////

interface FileSystemDirectoryHandle {
    [Symbol.asyncIterator](): BuiltinAsyncIterator<[string, FileSystemHandle], BuiltinIteratorReturn>;
    entries(): BuiltinAsyncIterator<[string, FileSystemHandle], BuiltinIteratorReturn>;
    keys(): BuiltinAsyncIterator<string, BuiltinIteratorReturn>;
    values(): BuiltinAsyncIterator<FileSystemHandle, BuiltinIteratorReturn>;
}

interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): BuiltinAsyncIterator<R, BuiltinIteratorReturn>;
    values(options?: ReadableStreamIteratorOptions): BuiltinAsyncIterator<R, BuiltinIteratorReturn>;
}

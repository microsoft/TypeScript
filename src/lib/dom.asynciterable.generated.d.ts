/////////////////////////////
/// Window Async Iterable APIs
/////////////////////////////

interface FileSystemDirectoryHandleAsyncIterator<T> extends AsyncIteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.asyncIterator](): FileSystemDirectoryHandleAsyncIterator<T>;
}

interface FileSystemDirectoryHandle {
    [Symbol.asyncIterator](): FileSystemDirectoryHandleAsyncIterator<[string, FileSystemHandle]>;
    entries(): FileSystemDirectoryHandleAsyncIterator<[string, FileSystemHandle]>;
    keys(): FileSystemDirectoryHandleAsyncIterator<string>;
    values(): FileSystemDirectoryHandleAsyncIterator<FileSystemHandle>;
}

interface ReadableStreamAsyncIterator<T> extends AsyncIteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.asyncIterator](): ReadableStreamAsyncIterator<T>;
}

interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): ReadableStreamAsyncIterator<R>;
    values(options?: ReadableStreamIteratorOptions): ReadableStreamAsyncIterator<R>;
}

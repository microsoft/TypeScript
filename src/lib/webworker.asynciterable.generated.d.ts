/////////////////////////////
/// Worker Async Iterable APIs
/////////////////////////////

interface FileSystemDirectoryHandle {
    [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
    entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
    keys(): AsyncIterableIterator<string>;
    values(): AsyncIterableIterator<FileSystemHandle>;
}

interface ReadableStream<R = any> {
    [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): AsyncIterableIterator<R>;
    values(options?: ReadableStreamIteratorOptions): AsyncIterableIterator<R>;
}

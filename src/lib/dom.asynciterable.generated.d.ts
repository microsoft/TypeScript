/////////////////////////////
/// Window Async Iterable APIs
/////////////////////////////

/**
 * Generic async iterable iterator type that conforms to both
 * AsyncIterator and AsyncIterable protocols.
 */
type AsyncIterableIterator<T> = AsyncIterator<T, void, unknown> & {
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
};

// ==========================
// File System Access API
// ==========================

/**
 * Represents a handle to a file or directory.
 * Extend this interface based on actual implementation or spec.
 */
interface FileSystemHandle {} // Placeholder for real handle definition

/**
 * Represents a directory handle capable of returning async iterators
 * for entries (key-value pairs), keys (file/directory names), and values (handles).
 */
interface FileSystemDirectoryHandle {
  /**
   * Default async iterator over [name, handle] pairs.
   */
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;

  /**
   * Returns an async iterator over [name, handle] pairs.
   */
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;

  /**
   * Returns an async iterator over file/directory names (keys).
   */
  keys(): AsyncIterableIterator<string>;

  /**
   * Returns an async iterator over file/directory handles (values).
   */
  values(): AsyncIterableIterator<FileSystemHandle>;
}

// ==========================
// ReadableStream API
// ==========================

/**
 * Options for customizing the behavior of ReadableStream async iteration.
 */
interface ReadableStreamIteratorOptions {
  /**
   * If true, prevents canceling the stream when iteration ends early.
   */
  preventCancel?: boolean;
}

/**
 * Extends ReadableStream with async iteration support via Symbol.asyncIterator
 * and the `values()` method. This enables for-await-of streaming of chunks.
 */
interface ReadableStream<R = any> {
  /**
   * Returns an async iterator over stream chunks.
   */
  [Symbol.asyncIterator](options?: ReadableStreamIteratorOptions): AsyncIterableIterator<R>;

  /**
   * Returns an async iterator over stream chunks.
   * Functionally identical to Symbol.asyncIterator().
   */
  values(options?: ReadableStreamIteratorOptions): AsyncIterableIterator<R>;
}

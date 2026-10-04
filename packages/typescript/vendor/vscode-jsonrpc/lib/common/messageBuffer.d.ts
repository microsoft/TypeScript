import RAL from './ral';
export declare abstract class AbstractMessageBuffer implements RAL.MessageBuffer {
    private _encoding;
    private _chunks;
    private _totalLength;
    constructor(encoding?: RAL.MessageBufferEncoding);
    protected abstract emptyBuffer(): Uint8Array;
    protected abstract fromString(value: string, encoding: RAL.MessageBufferEncoding): Uint8Array;
    protected abstract toString(value: Uint8Array, encoding: RAL.MessageBufferEncoding): string;
    protected abstract asNative(buffer: Uint8Array, length?: number): Uint8Array;
    protected abstract allocNative(length: number): Uint8Array;
    get encoding(): RAL.MessageBufferEncoding;
    append(chunk: Uint8Array | string): void;
    tryReadHeaders(lowerCaseKeys?: boolean): Map<string, string> | undefined;
    tryReadBody(length: number): Uint8Array | undefined;
    get numberOfBytes(): number;
    private _read;
}

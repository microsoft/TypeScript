/*@internal*/
namespace ts.server.rpc {
    const CR: number = 13;
    const LF: number = 10;
    const CRLF: string = "\r\n";

    export abstract class AbstractMessageBuffer implements RAL.MessageBuffer {
        private _encoding: RAL.MessageBufferEncoding;
        private _chunks: Uint8Array[];
        private _totalLength: number;

        constructor(encoding: RAL.MessageBufferEncoding = "utf-8") {
            this._encoding = encoding;
            this._chunks = [];
            this._totalLength = 0;
        }

        protected abstract emptyBuffer(): Uint8Array;
        protected abstract fromString(
            value: string,
            encoding: RAL.MessageBufferEncoding
        ): Uint8Array;
        protected abstract toString(
            value: Uint8Array,
            encoding: RAL.MessageBufferEncoding
        ): string;
        protected abstract asNative(
            buffer: Uint8Array,
            length?: number
        ): Uint8Array;
        protected abstract allocNative(length: number): Uint8Array;

        public get encoding(): RAL.MessageBufferEncoding {
            return this._encoding;
        }

        public append(chunk: Uint8Array | string) {
            const toAppend =
                typeof chunk === "string"
                    ? this.fromString(chunk, this._encoding)
                    : chunk;
            this._chunks.push(toAppend);
            this._totalLength += toAppend.byteLength;
        }

        public tryReadHeaders(): Map<string, string> | undefined {
            if (this._chunks.length === 0) {
                return undefined;
            }
            let state = 0;
            let chunkIndex = 0;
            let offset = 0;
            let chunkBytesRead: number = 0;
            row: while (chunkIndex < this._chunks.length) {
                const chunk = this._chunks[chunkIndex];
                offset = 0;
                column: while (offset < chunk.length) {
                    const value = chunk[offset];
                    switch (value) {
                        case CR:
                            switch (state) {
                                case 0:
                                    state = 1;
                                    break;
                                case 2:
                                    state = 3;
                                    break;
                                default:
                                    state = 0;
                            }
                            break;
                        case LF:
                            switch (state) {
                                case 1:
                                    state = 2;
                                    break;
                                case 3:
                                    state = 4;
                                    offset++;
                                    break row;
                                default:
                                    state = 0;
                            }
                            break;
                        default:
                            state = 0;
                    }
                    offset++;
                }
                chunkBytesRead += chunk.byteLength;
                chunkIndex++;
            }
            if (state !== 4) {
                return undefined;
            }

            // The buffer contains the two CRLF at the end. So we will
            // have two empty lines after the split at the end as well.
            const buffer = this._read(chunkBytesRead + offset);
            const result: Map<string, string> = new Map();
            const headers = this.toString(buffer, "ascii").split(CRLF);
            if (headers.length < 2) {
                return result;
            }
            for (let i = 0; i < headers.length - 2; i++) {
                const header = headers[i];
                const index: number = header.indexOf(":");
                if (index === -1) {
                    throw new Error(
                        "Message header must separate key and value using :"
                    );
                }
                const key = header.substr(0, index);
                const value = header.substr(index + 1).trim();

                result.set(key, value);
            }
            return result;
        }

        public tryReadBody(length: number): Uint8Array | undefined {
            if (this._totalLength < length) {
                return undefined;
            }

            return this._read(length);
        }

        public get numberOfBytes(): number {
            return this._totalLength;
        }

        private _read(byteCount: number): Uint8Array {
            if (byteCount === 0) {
                return this.emptyBuffer();
            }

            if (byteCount > this._totalLength) {
                throw new Error(`Cannot read so many bytes!`);
            }

            if (this._chunks[0].byteLength === byteCount) {
                // super fast path, precisely first chunk must be returned
                const chunk = this._chunks[0];
                this._chunks.shift();
                this._totalLength -= byteCount;
                return this.asNative(chunk);
            }

            if (this._chunks[0].byteLength > byteCount) {
                // fast path, the reading is entirely within the first chunk
                const chunk = this._chunks[0];
                const result: Uint8Array = this.asNative(chunk, byteCount);
                this._chunks[0] = chunk.slice(byteCount);
                this._totalLength -= byteCount;
                return result;
            }

            const result = this.allocNative(byteCount);
            let resultOffset = 0;
            let chunkIndex = 0;
            while (byteCount > 0) {
                const chunk = this._chunks[chunkIndex];
                if (chunk.byteLength > byteCount) {
                    // this chunk will survive
                    const chunkPart = chunk.slice(0, byteCount);
                    result.set(chunkPart, resultOffset);
                    resultOffset += byteCount;
                    this._chunks[chunkIndex] = chunk.slice(byteCount);
                    this._totalLength -= byteCount;
                    byteCount -= byteCount;
                } else {
                    // this chunk will be entirely read
                    result.set(chunk, resultOffset);
                    resultOffset += chunk.byteLength;
                    this._chunks.shift();
                    this._totalLength -= chunk.byteLength;
                    byteCount -= chunk.byteLength;
                }
            }
            return result;
        }
    }
}

/*@internal*/
namespace ts.server.rpc {
    export class StreamMessageReader extends ReadableStreamMessageReader {
        public constructor(readble: NodeJS.ReadableStream, encoding?: RAL.MessageBufferEncoding | MessageReaderOptions) {
            super(RIL().stream.asReadableStream(readble), encoding);
        }
    }

    export class StreamMessageWriter extends WriteableStreamMessageWriter {
        public constructor(writable: NodeJS.WritableStream, options?: RAL.MessageBufferEncoding | MessageWriterOptions) {
            super(RIL().stream.asWritableStream(writable), options);
        }
    }
}

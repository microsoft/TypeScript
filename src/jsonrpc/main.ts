/*@internal*/
namespace ts.server.rpc {
    export class StreamMessageReader extends ReadableStreamMessageReader {
        public constructor(readble: NodeJS.ReadableStream, encoding?: RAL.MessageBufferEncoding | MessageReaderOptions) {
            super(RIL().stream.asReadableStream(readble), encoding);
        }
    }
}

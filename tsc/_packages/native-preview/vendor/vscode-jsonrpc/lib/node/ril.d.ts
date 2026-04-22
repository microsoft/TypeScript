import { RAL } from '../common/api';
interface RIL extends RAL {
    readonly stream: {
        readonly asReadableStream: (stream: NodeJS.ReadableStream) => RAL.ReadableStream;
        readonly asWritableStream: (stream: NodeJS.WritableStream) => RAL.WritableStream;
    };
}
declare function RIL(): RIL;
declare namespace RIL {
    function install(): void;
}
export default RIL;

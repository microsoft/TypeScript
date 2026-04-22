import { RAL, Disposable } from '../common/api';
interface RIL extends RAL {
    readonly stream: {
        readonly asReadableStream: (stream: WebSocket) => RAL.ReadableStream;
        readonly asWritableStream: (stream: WebSocket) => RAL.WritableStream;
    };
}
export declare class QueueMicrotaskImpl implements Disposable {
    private isDisposed;
    constructor(callback: (...args: any[]) => void, ...args: any[]);
    dispose(): void;
}
export declare class PromiseImpl implements Disposable {
    private isDisposed;
    constructor(callback: (...args: any[]) => void, ...args: any[]);
    dispose(): void;
}
declare function RIL(): RIL;
declare namespace RIL {
    function install(): void;
}
export default RIL;

import { Event } from './events';
import { Disposable } from './disposable';
/**
 * Defines a CancellationToken. This interface is not
 * intended to be implemented. A CancellationToken must
 * be created via a CancellationTokenSource.
 */
export interface CancellationToken {
    /**
     * Is `true` when the token has been cancelled, `false` otherwise.
     */
    readonly isCancellationRequested: boolean;
    /**
     * An {@link Event event} which fires upon cancellation.
     */
    readonly onCancellationRequested: Event<any>;
}
export declare namespace CancellationToken {
    const None: CancellationToken;
    const Cancelled: CancellationToken;
    function is(value: any): value is CancellationToken;
}
export interface AbstractCancellationTokenSource extends Disposable {
    token: CancellationToken;
    cancel(): void;
}
export declare class CancellationTokenSource implements AbstractCancellationTokenSource {
    private _token;
    get token(): CancellationToken;
    cancel(): void;
    dispose(): void;
}

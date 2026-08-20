import { RequestMessage } from './messages';
import { AbstractCancellationTokenSource } from './cancellation';
import { CancellationId, RequestCancellationReceiverStrategy, CancellationSenderStrategy, MessageConnection } from './connection';
export declare class SharedArraySenderStrategy implements CancellationSenderStrategy {
    private readonly buffers;
    constructor();
    enableCancellation(request: RequestMessage): void;
    sendCancellation(_conn: MessageConnection, id: CancellationId): Promise<void>;
    cleanup(id: CancellationId): void;
    dispose(): void;
}
export declare class SharedArrayReceiverStrategy implements RequestCancellationReceiverStrategy {
    readonly kind: "request";
    createCancellationTokenSource(request: RequestMessage): AbstractCancellationTokenSource;
}

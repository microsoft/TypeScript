///<reference path='ICancellationToken.ts' />

interface ICancellationTokenSource {
    token(): ICancellationToken;

    cancel(): void;
}
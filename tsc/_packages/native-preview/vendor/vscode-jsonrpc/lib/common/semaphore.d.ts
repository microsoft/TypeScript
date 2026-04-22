export declare class Semaphore<T = void> {
    private _capacity;
    private _active;
    private _waiting;
    constructor(capacity?: number);
    lock(thunk: () => T | PromiseLike<T>): Promise<T>;
    get active(): number;
    private runNext;
    private doRunNext;
}

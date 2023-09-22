/** @internal */
export interface Lockable {
    tryLock(): boolean;
    lock(): void;
    unlock(): void;
}

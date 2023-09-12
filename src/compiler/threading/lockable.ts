/** @internal */
export interface BasicLockable {
    lock(): void;
    unlock(): void;
}

/** @internal */
export interface Lockable extends BasicLockable {
    tryLock(): boolean;
}

/** @internal */
export interface SharedLockable {
    tryLockShared(): boolean;
    lockShared(): void;
    unlockShared(): void;
}

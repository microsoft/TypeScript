import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { isTaggedStruct, Tag, Tagged } from "../sharing/structs/taggedStruct";

/** @internal */
@Shared()
export class ManualResetEvent extends Tagged(SharedStructBase, Tag.ManualResetEvent) {
    @Shared() private mutex = new Atomics.Mutex();
    @Shared() private condition = new Atomics.Condition();
    @Shared() private signaled = false;

    static isSet(self: ManualResetEvent) {
        return self.signaled;
    }

    static set(self: ManualResetEvent) {
        let result = false;
        Atomics.Mutex.tryLock(self.mutex, () => {
            if (!self.signaled) {
                self.signaled = true;
                Atomics.Condition.notify(self.condition);
                result = true;
            }
        });
        return result;
    }

    static reset(self: ManualResetEvent) {
        let result = false;
        Atomics.Mutex.tryLock(self.mutex, () => {
            if (self.signaled) {
                self.signaled = false;
                result = true;
            }
        });
        return result;
    }

    static wait(self: ManualResetEvent, timeout?: number) {
        return Atomics.Mutex.lock(self.mutex, () => Atomics.Condition.wait(self.condition, self.mutex, timeout));
    }

    static [Symbol.hasInstance](value: unknown): value is ManualResetEvent {
        return isTaggedStruct(value, Tag.ManualResetEvent);
    }
}
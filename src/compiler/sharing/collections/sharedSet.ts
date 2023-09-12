import { Identifiable } from "../structs/identifiableStruct";
import { Shared, SharedStructBase } from "../structs/sharedStruct";
import { Tag, Tagged } from "../structs/taggedStruct";
import { HashData } from "./hashData";

@Shared()
export class SharedSet<T extends Shareable> extends Identifiable(Tagged(SharedStructBase, Tag.Set)) {
    @Shared() private _hashData: HashData<T, T>;

    constructor(capacity = 0) {
        super();
        this._hashData = new HashData(capacity);
    }

    static size<T extends Shareable>(self: SharedSet<T>) {
        return self._hashData.size - self._hashData.freeSize;
    }

    static has<T extends Shareable>(self: SharedSet<T>, value: T) {
        return HashData.findEntryIndex(self._hashData, value) >= 0;
    }

    static add<T extends Shareable>(self: SharedSet<T>, value: T) {
        HashData.insertEntry(self._hashData, value, value);
        return self;
    }

    static delete<T extends Shareable>(self: SharedSet<T>, value: T) {
        return HashData.deleteEntry(self._hashData, value);
    }

    static clear<T extends Shareable>(self: SharedSet<T>) {
        HashData.clearEntries(self._hashData);
    }

    static ensureCapacity<T extends Shareable>(self: SharedSet<T>, capacity: number) {
        return HashData.ensureCapacity(self._hashData, capacity);
    }

    static trimExcess<T extends Shareable>(self: SharedSet<T>, capacity?: number) {
        HashData.trimExcessEntries(self._hashData, capacity);
    }

    static keys<T extends Shareable>(self: SharedSet<T>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryKey);
    }

    static values<T extends Shareable>(self: SharedSet<T>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryValue);
    }

    static entries<T extends Shareable>(self: SharedSet<T>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryEntry);
    }
}

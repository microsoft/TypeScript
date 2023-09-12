import { Identifiable } from "../structs/identifiableStruct";
import { Shared, SharedStructBase } from "../structs/sharedStruct";
import { Tag, Tagged } from "../structs/taggedStruct";
import { HashData } from "./hashData";

@Shared()
export class SharedMap<K extends Shareable, V extends Shareable> extends Identifiable(Tagged(SharedStructBase, Tag.Map)) {
    @Shared() private _hashData: HashData<K, V>;

    constructor(capacity = 0) {
        super();
        this._hashData = new HashData(capacity);
    }

    static size<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>) {
        return self._hashData.size - self._hashData.freeSize;
    }

    static has<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, key: K) {
        return HashData.findEntryIndex(self._hashData, key) >= 0;
    }

    static get<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, key: K) {
        return HashData.findEntryValue(self._hashData, key);
    }

    static set<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, key: K, value: V) {
        HashData.insertEntry(self._hashData, key, value);
        return self;
    }

    static delete<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, key: K) {
        return HashData.deleteEntry(self._hashData, key);
    }

    static clear<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>) {
        HashData.clearEntries(self._hashData);
    }

    static ensureCapacity<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, capacity: number) {
        return HashData.ensureCapacity(self._hashData, capacity);
    }

    static trimExcess<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>, capacity?: number) {
        HashData.trimExcessEntries(self._hashData, capacity);
    }

    static keys<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryKey);
    }

    static values<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryValue);
    }

    static entries<K extends Shareable, V extends Shareable>(self: SharedMap<K, V>) {
        return HashData.iterateEntries(self._hashData.head, HashData.selectEntryEntry);
    }
}

import { TransformFlags } from "../types";
import type { SharedNodeBase } from "./sharedNode";
import { Identifiable } from "./structs/identifiableStruct";
import { isShareableNonPrimitive } from "./structs/shareable";
import { Shared, SharedStructBase } from "./structs/sharedStruct";
import { isTaggedStruct, Tag, Tagged } from "./structs/taggedStruct";

/** @internal */
@Shared()
export class SharedNodeArray<T extends SharedNodeBase> extends Identifiable(Tagged(SharedStructBase, Tag.NodeArray)) {
    @Shared() items!: SharedArray<T>;
    @Shared() pos = -1;
    @Shared() end = -1;
    @Shared() hasTrailingComma = false;
    @Shared() transformFlags = TransformFlags.None;
    @Shared() isMissingList = false;

    static * values<T extends SharedNodeBase>(self: SharedNodeArray<T>): IterableIterator<T> {
        for (let i = 0; i < self.items.length; i++) {
            yield self.items[i];
        }
    }

    static [Symbol.hasInstance](value: unknown): value is SharedNodeArray<SharedNodeBase> {
        return isShareableNonPrimitive(value) &&
            isTaggedStruct(value) &&
            value.__tag__ === Tag.NodeArray;
    }
}

import { Identifiable } from "../structs/identifiableStruct";
import { Shared, SharedStructBase } from "../structs/sharedStruct";
import { Tag, Tagged } from "../structs/taggedStruct";

// TODO: consider constructing ropes of shared arrays rather than reallocating and copying.

/**
 * The default `SharedArray` implementation depends on a fixed-length array. A ResizableSharedArray is an abstraction
 * over `SharedArray` that allows us to emulate resizing.
 * @internal
 */
@Shared()
export class SharedResizableArray<T extends Shareable> extends Identifiable(Tagged(SharedStructBase, Tag.ResizableArray)) {
    @Shared() items: SharedArray<T>;

    constructor(initialSize = 0) {
        super();
        this.items = new SharedArray(initialSize);
    }

    static size<T extends Shareable>(self: SharedResizableArray<T>) {
        return self.items.length;
    }

    static get<T extends Shareable>(self: SharedResizableArray<T>, index: number): T {
        return self.items[index];
    }

    static set<T extends Shareable>(self: SharedResizableArray<T>, index: number, value: T): SharedResizableArray<T> {
        if (index >= self.items.length) {
            this.resize(self, index + 1);
        }
        self.items[index] = value;
        return self;
    }

    static resize<T extends Shareable>(self: SharedResizableArray<T>, newLength: number) {
        if (self.items.length !== newLength) {
            const newArray = new SharedArray<T>(newLength);
            const minSize = Math.min(self.items.length, newLength);
            for (let i = 0; i < minSize; i++) {
                newArray[i] = self.items[i];
            }
        }
        return self;
    }
}

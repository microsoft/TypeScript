import { Shared, SharedStructBase } from "../structs/sharedStruct";

@Shared()
class Ring<T extends Shareable> extends SharedStructBase {
    @Shared() readonly size: number;
    @Shared() readonly mask: number;
    @Shared() readonly segment: SharedArray<T | undefined>;

    constructor(size: number) {
        super();
        const mask = size - 1;
        if (size & mask) throw new RangeError("Must be a power of 2");

        this.size = size;
        this.mask = mask;
        this.segment = new SharedArray(size);
    }

    static size<T extends Shareable>(self: Ring<T>) {
        return Atomics.load(self, "size");
    }

    static get<T extends Shareable>(self: Ring<T>, i: number) {
        return Atomics.load(self.segment, i & Atomics.load(self, "mask"));
    }

    static put<T extends Shareable>(self: Ring<T>, i: number, value: T) {
        Atomics.store(self.segment, i & Atomics.load(self, "mask"), value);
    }

    static grow<T extends Shareable>(self: Ring<T>, bottom: number, top: number) {
        const size = Atomics.load(self, "size");
        const newSize = (size << 1) >>> 0;
        if (newSize < size) throw new RangeError();
        const a: Ring<T> = new Ring(newSize);
        for (let i = top; i < bottom; i++) {
            Ring.put(a, i, Ring.get(self, i));
        }
        return a;
    }

    static shrink<T extends Shareable>(self: Ring<T>, bottom: number, top: number) {
        const size = Atomics.load(self, "size");
        if (size <= 1) return self;
        const a: Ring<T> = new Ring(size >>> 1);
        for (let i = top; i < bottom; i++) {
            Ring.put(a, i, Ring.get(self, i));
        }
        return a;
    }
}

const kDequeInitialCapacity = 1 << 5;
const kDequeTrimFactor = 3;

/**
 * Chase-Lev Deque based on "Dynamic Circular Work-Stealing Deque"
 * @see {@link https://dl.acm.org/doi/10.1145/1073970.1073974}
 * @template {Shareable} T
 */
@Shared()
export class Deque<T extends Shareable> extends SharedStructBase {
    @Shared() readonly top: number;
    @Shared() readonly bottom: number;
    @Shared() readonly array: Ring<T>;

    constructor() {
        super();
        this.top = 0;
        this.bottom = 0;
        this.array = new Ring(kDequeInitialCapacity);
    }

    static pushBottom<T extends Shareable>(self: Deque<T>, value: T) {
        const bottom = Atomics.load(self, "bottom");
        const top = Atomics.load(self, "top");
        let array = Atomics.load(self, "array");
        if (bottom - top > Ring.size(array) - 1) {
            array = Ring.grow(array, bottom, top);
            Atomics.store(self, "array", array);
        }
        Ring.put(array, bottom, value);
        Atomics.store(self, "bottom", bottom + 1);
    }

    static popBottom<T extends Shareable>(self: Deque<T>) {
        const bottom = Atomics.load(self, "bottom") - 1;
        const array = Atomics.load(self, "array");
        Atomics.store(self, "bottom", bottom);
        const top = Atomics.load(self, "top");
        const size = bottom - top;
        if (size < 0) {
            Atomics.store(self, "bottom", top);
            return undefined;
        }
        let value = Ring.get(array, bottom);
        if (size > 0) {
            Deque.trim(self, bottom, top);
            return value;
        }
        const result = top === Atomics.compareExchange(self, "top", top, top + 1);
        Atomics.store(self, "bottom", top + 1);
        return result ? value : undefined;
    }

    static steal<T extends Shareable>(self: Deque<T>) {
        const top = Atomics.load(self, "top");
        const bottom = Atomics.load(self, "bottom");
        const array = Atomics.load(self, "array");
        if (bottom - top <= 0) {
            return undefined;
        }
        const value = Ring.get(array, top);
        if (top !== Atomics.compareExchange(self, "top", top, top + 1)) {
            return undefined;
        }
        return value;
    }

    private static trim<T extends Shareable>(self: Deque<T>, bottom: number, top: number) {
        const array = Atomics.load(self, "array");
        if (bottom - top < Ring.size(array) / kDequeTrimFactor) {
            Atomics.store(self, "array", Ring.shrink(array, bottom, top));
        }
    }
}

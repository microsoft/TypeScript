import { emptyArray } from "../../core";
import { Debug } from "../../debug";
import { AtomicValue } from "../../threading/atomicValue";
import { workerThreads } from "../../workerThreads";
import { isShareablePrimitive } from "../structs/shareable";
import { Shared, SharedStructBase } from "../structs/sharedStruct";

/**
 * A ring buffer that can be resized.
 */
@Shared()
class Ring<T extends NonNullable<Shareable>> extends SharedStructBase {
    @Shared() private readonly mask: AtomicValue<number>;
    @Shared() private readonly segment: SharedArray<T | undefined>;

    constructor(size: number) {
        super();
        const mask = size - 1;
        if (size & mask) throw new RangeError("Must be a power of 2");

        this.mask = new AtomicValue<number>(mask);
        this.segment = new SharedArray(size);
    }

    static size<T extends NonNullable<Shareable>>(self: Ring<T>) {
        return Ring.mask(self) + 1;
    }

    static mask<T extends NonNullable<Shareable>>(self: Ring<T>) {
        return AtomicValue.load(self.mask);
    }

    static get<T extends NonNullable<Shareable>>(self: Ring<T>, i: number) {
        return Atomics.load(self.segment, i & AtomicValue.load(self.mask));
    }

    static set<T extends NonNullable<Shareable>>(self: Ring<T>, i: number, value: T | undefined) {
        Atomics.store(self.segment, i & AtomicValue.load(self.mask), value);
    }

    static exchange<T extends NonNullable<Shareable>>(self: Ring<T>, i: number, value: T | undefined) {
        return Atomics.exchange(self.segment, i & AtomicValue.load(self.mask), value);
    }

    static compareExchange<T extends NonNullable<Shareable>>(self: Ring<T>, i: number, expectedValue: T | undefined, replacementValue: T | undefined) {
        return Atomics.compareExchange(self.segment, i & AtomicValue.load(self.mask), expectedValue, replacementValue);
    }

    static grow<T extends NonNullable<Shareable>>(self: Ring<T>, bottom: number, top: number, capacity: number) {
        const size = Ring.size(self);
        let newSize = (size << 1) >>> 0; // convert to u32
        if (newSize < size) throw new RangeError();
        while (newSize < capacity) {
            newSize = (newSize << 1) >>> 0; // convert to u32
            if (newSize < size) throw new RangeError();
        }
        const a = new Ring<T>(newSize);
        for (let i = top; i < bottom; i++) {
            Ring.set(a, i, Ring.get(self, i)!);
        }
        return a;
    }

    static shrink<T extends NonNullable<Shareable>>(self: Ring<T>, bottom: number, top: number) {
        const size = Ring.size(self);
        if (size <= 1) return self;
        const a = new Ring<T>(size >>> 1);
        for (let i = top; i < bottom; i++) {
            Ring.set(a, i, Ring.get(self, i)!);
        }
        return a;
    }
}

/**
 * Object that holds nonprimitive values in the Deque.
 *
 * Array elements are not reset when popped/stolen, which may prevent GC for large object graphs like a SourceFile and
 * its children. Instead, we box nonprimitives so that we can safely unset them later, after we've read from the array
 * and adjusted the top/bottom pointers of the deque. This also helps to avoid the ABA problem since we're not
 * attempting a `compareExchange` against a value that may have been removed and then re-added to the deque as two
 * independent operations in other threads.
 */
@Shared()
class Box<T extends ShareableNonPrimitive> extends SharedStructBase {
    @Shared() value: T | undefined;
    constructor(value: T) {
        super();
        this.value = value;
    }

    static box<T extends NonNullable<Shareable>>(value: T) {
        return isShareablePrimitive(value) ? value : new Box(value);
    }

    static take<T extends NonNullable<Shareable>>(value: Extract<T, ShareablePrimitive> | Box<Extract<T, ShareableNonPrimitive>> | undefined): T | undefined {
        return isShareablePrimitive(value) ?
            value as Extract<T, ShareablePrimitive> | undefined :
            Atomics.exchange(value as Box<Extract<T, ShareableNonPrimitive>>, "value", /*value*/ undefined) as Extract<T, ShareableNonPrimitive> | undefined;
    }

    static peek<T extends NonNullable<Shareable>>(value: Extract<T, ShareablePrimitive> | Box<Extract<T, ShareableNonPrimitive>> | undefined): T | undefined {
        return isShareablePrimitive(value) ?
            value as Extract<T, ShareablePrimitive> | undefined :
            Atomics.load(value as Box<Extract<T, ShareableNonPrimitive>>, "value") as Extract<T, ShareableNonPrimitive> | undefined;
    }
}

const kDequeInitialCapacity = 1 << 5;
const kDequeTrimFactor = 3;

/**
 * Chase-Lev Deque based on "Dynamic Circular Work-Stealing Deque"
 * @see {@link https://dl.acm.org/doi/10.1145/1073970.1073974}
 * @internal
 */
@Shared()
export class Deque<T extends NonNullable<Shareable>> extends SharedStructBase {
    @Shared() readonly threadId = workerThreads?.threadId ?? 0;
    @Shared() private readonly top = new AtomicValue<number>(0);
    @Shared() private readonly bottom = new AtomicValue<number>(0);
    @Shared() private readonly array = new AtomicValue(new Ring<Extract<T, ShareablePrimitive> | Box<Extract<T, ShareableNonPrimitive>>>(kDequeInitialCapacity));

    /**
     * Push a value onto the bottom of the deque. Pushes can only be performed by the thread that owns the deque.
     */
    static push<T extends NonNullable<Shareable>>(self: Deque<T>, value: T) {
        Deque.checkOwner(self);
        const bottom = AtomicValue.load(self.bottom);
        const top = AtomicValue.load(self.top);
        const array = Deque.reserve(self, bottom, top, (bottom - top) + 1);
        Ring.set(array, bottom, Box.box(value));
        AtomicValue.store(self.bottom, wrappingAdd(bottom, 1));
    }

    /**
     * Pushes multiple values onto the bottom of the deque. Pushes can only be performed by the thread that owns the
     * deque.
     */
    static pushMany<T extends NonNullable<Shareable>>(self: Deque<T>, values: ArrayLike<T>) {
        Deque.checkOwner(self);
        if (values.length > 0) {
            const bottom = AtomicValue.load(self.bottom);
            const top = AtomicValue.load(self.top);
            const array = Deque.reserve(self, bottom, top, (bottom - top) + values.length);
            for (let i = 0; i < values.length; i++) {
                Ring.set(array, bottom + i, Box.box(values[i]));
            }
            AtomicValue.store(self.bottom, wrappingAdd(bottom, values.length));
        }
    }

    /**
     * Tries to pop a value off the bottom of the deque. Pops can only be performed by the thread that owns the deque.
     * Other threads should {@link steal} instead.
     */
    static pop<T extends NonNullable<Shareable>>(self: Deque<T>) {
        Deque.checkOwner(self);
        const bottom = wrappingSub(AtomicValue.load(self.bottom), 1);
        AtomicValue.store(self.bottom, bottom); // take bottom

        const top = AtomicValue.load(self.top);
        const size = bottom - top;
        if (size < 0) { // deque was already empty, reset to canonical empty state
            AtomicValue.store(self.bottom, top);
            return undefined;
        }

        const value = Ring.get(AtomicValue.load(self.array), bottom);
        if (bottom - top > 0) { // deque had more than one element, so we are safe from a concurrent steal.
            Deque.trim(self, bottom, top); // trim excess unused elements
            return Debug.checkDefined(Box.take(value));
        }

        // The deque had only one element and is becoming empty, so we may be in a race against any concurrent steal.
        const result = top === AtomicValue.compareExchange(self.top, top, wrappingAdd(top, 1));

        // If we lose the race, `top` will already be `top + 1`. Reset to the canonical empty state by also setting
        // bottom to `top + 1`
        AtomicValue.store(self.bottom, wrappingAdd(top, 1));
        return result ? Debug.checkDefined(Box.take(value)) : undefined;
    }

    /**
     * Tries to steal the top item in the deque. Steals should generally be performed by threads other than the thread
     * that owns the deque.
     */
    static steal<T extends NonNullable<Shareable>>(self: Deque<T>) {
        const top = AtomicValue.load(self.top);
        const bottom = AtomicValue.load(self.bottom);
        const size = bottom - top;
        if (size <= 0) { // queue is empty
            return undefined;
        }
        const value = Ring.get(AtomicValue.load(self.array), top); // take value before CAS
        if (top === AtomicValue.compareExchange(self.top, top, wrappingAdd(top, 1))) {
            return Box.take(value);
        }
        return undefined;
    }

    /**
     * Attempts to steal a chunk of items from the deque, up to a max of about half of the items in the deque.
     */
    static stealMany<T extends NonNullable<Shareable>>(self: Deque<T>, count: number): readonly T[] {
        let taken: T[] | undefined;
        const top = AtomicValue.load(self.top);
        const bottom = AtomicValue.load(self.bottom);
        const size = bottom - top;
        if (size > 0) {
            count = Math.min(count, ((size + 1) << 1) >>> 0);
            for (let i = 0; i < count; i++) {
                if (i > 0 && AtomicValue.load(self.bottom) - top <= 0) {
                    break;
                }
                const value = Ring.get(AtomicValue.load(self.array), top);
                const result = top === AtomicValue.compareExchange(self.top, top, wrappingAdd(top, 1));
                if (!result) {
                    break;
                }
                taken ??= [];
                taken.push(Debug.checkDefined(Box.take(value)));
            }
        }
        return taken ?? emptyArray;
    }

    private static checkOwner<T extends NonNullable<Shareable>>(self: Deque<T>) {
        const ownerThreadId = Atomics.load(self, "threadId");
        const threadId = workerThreads?.threadId ?? 0;
        if (ownerThreadId !== threadId) Debug.fail(`Wrong thread. Expected ${ownerThreadId} but got ${threadId}`);
    }

    private static reserve<T extends NonNullable<Shareable>>(self: Deque<T>, bottom: number, top: number, capacity: number) {
        let array = AtomicValue.load(self.array);
        if (capacity > Ring.mask(array)) {
            array = Ring.grow(array, bottom, top, capacity);
            AtomicValue.store(self.array, array);
        }
        return array;
    }

    private static trim<T extends NonNullable<Shareable>>(self: Deque<T>, bottom: number, top: number) {
        const array = AtomicValue.load(self.array);
        if (bottom - top < Ring.size(array) / kDequeTrimFactor) {
            AtomicValue.store(self.array, Ring.shrink(array, bottom, top));
        }
    }
}

function wrappingAdd(a: number, b: number) {
    return (a + b) | 0; // wrap i32 overflow
}

function wrappingSub(a: number, b: number) {
    return (a - b) | 0; // wrap i32 overflow
}

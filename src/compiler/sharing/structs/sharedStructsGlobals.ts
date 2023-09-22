export { };

// NOTE: These types relate to the origin trial implementation of the shared structs proposal and may not be indicative
//       of the final proposal. To use these types you must pass `--shared-string-table --harmony-struct` to NodeJS.

// the following brands are used to distinguish Shared Structs-related objects from other objects since they are not
// interchangeable with `object`:
declare const kGlobalSharedStructBrand: unique symbol;
declare const kGlobalSharedArrayBrand: unique symbol;
declare const kGlobalMutexBrand: unique symbol;
declare const kGlobalConditionBrand: unique symbol;

declare global {
    type ShareablePrimitive =
        | string
        | number
        | boolean
        | null
        | undefined
        | OtherShareablePrimitive[keyof OtherShareablePrimitive]
        ;

    type ShareableNonPrimitive =
        | SharedStruct
        | SharedArray<Shareable>
        | Atomics.Mutex
        | Atomics.Condition
        | OtherShareableNonPrimitive[keyof OtherShareableNonPrimitive]
        ;

    type Shareable =
        | ShareablePrimitive
        | ShareableNonPrimitive
        ;

    interface OtherShareablePrimitive {}
    interface OtherShareableNonPrimitive {}

    interface SharedStruct {
        [kGlobalSharedStructBrand]: any;
    }

    type SharedStructType<T extends SharedStruct & { readonly [P in keyof T]: Shareable }> = new () => T;

    interface SharedStructTypeConstructor {
        new <T extends SharedStruct & { readonly [P in keyof T]: Shareable }>(fields: readonly (keyof T & string)[]): SharedStructType<T>;
        new <K extends string>(fields: readonly K[]): SharedStructType<SharedStruct> & Record<K, Shareable>;
        <T extends SharedStruct & { readonly [P in keyof T]: Shareable }>(fields: readonly (keyof T & string)[]): SharedStructType<T>;
        <K extends string>(fields: readonly K[]): SharedStructType<SharedStruct> & Record<K, Shareable>;
        isSharedStruct(value: unknown): value is SharedStruct;
    }

    const SharedStructType: SharedStructTypeConstructor;

    interface SharedArray<T extends Shareable> {
        [kGlobalSharedArrayBrand]: any;
        [index: number]: T;
        readonly length: number;
    }

    type SharedTuple<T extends Shareable[]> = 
        & SharedArray<T[number]>
        & { readonly length: T["length"] }
        & { [P in keyof T as P extends `${bigint}` ? P : never]: T[P] };

    interface ReadonlySharedArray<T extends Shareable> extends SharedArray<T> {
        readonly [index: number]: T;
    }

    type SharedArrayConstructor = new <T extends Shareable>(length: number) => SharedArray<T>;

    const SharedArray: SharedArrayConstructor;

    namespace Atomics {
        /**
         * An opaque object that represents a shareable mutex.
         */
        interface Mutex {
            [kGlobalMutexBrand]: any;
        }

        interface MutexConstructor {
            new (): Mutex;
            /**
             * Locks the mutex during the synchronous execution of the provided callback.
             * @param mutex The mutex object.
             * @param cb The callback to execute.
             * @returns The result of executing the callback.
             */
            lock<T>(mutex: Mutex, cb: () => T): T;
            /**
             * Tries to lock the mutex during the synchronous execution of the provided callback
             * @param mutex The mutex object.
             * @param cb The callback to execute.
             * @returns `true` if the lock was taken and the callback was executed; otherwise, `false`.
             */
            tryLock(mutex: Mutex, cb: () => void): boolean;
        }

        /**
         * An opaque object that represents a shareable condition variable.
         */
        interface Condition {
            [kGlobalConditionBrand]: any;
        }

        interface ConditionConstructor {
            new (): Condition;
            /**
             * Waits for a period of time for notification signal on a Condition.
             * @param condition The condition to wait for.
             * @param mutex The mutex to use to wait on.
             * @param timeout The period of time to wait.
             * @returns `true` if the condition was notified prior to the timeout elapsing; otherwise, `false`.
             */
            wait(condition: Condition, mutex: Mutex, timeout?: number): boolean;
            /**
             * Notify one or more waiters on a condition.
             * @param condition The condition to notify.
             * @param count The number of waiters to notify (default: all current waiters).
             * @returns The number of waiters that were notified.
             */
            notify(condition: Condition, count?: number): number;
        }
    }

    interface Atomics {
        readonly Mutex: Atomics.MutexConstructor;
        readonly Condition: Atomics.ConditionConstructor;
        compareExchange<T extends Shareable>(sharedArray: SharedArray<T>, index: number, expectedValue: T, replacementValue: T): T;
        compareExchange<T extends SharedStruct, K extends keyof T & string>(sharedStruct: T, key: K, expectedValue: T[K], replacementValue: T[K]): T[K];
        exchange<T extends Shareable>(sharedArray: SharedArray<T>, index: number, value: T): T;
        exchange<T extends SharedStruct, K extends keyof T & string>(sharedStruct: T, key: K, value: T[K]): T[K];
        load<T extends Shareable>(sharedArray: SharedArray<T>, index: number): T;
        load<T extends SharedStruct, K extends keyof T & string>(sharedStruct: T, key: K): T[K];
        store<T extends Shareable>(sharedArray: SharedArray<T>, index: number, value: T): T;
        store<T extends SharedStruct, K extends keyof T & string, V extends T[K]>(sharedStruct: T, key: K, value: V): V;
    }
}

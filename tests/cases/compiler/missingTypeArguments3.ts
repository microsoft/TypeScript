declare module linq {

    interface Enumerable<T> {
        OrderByDescending(keySelector?: string): OrderedEnumerable<T>;
        GroupBy<TKey>(keySelector: (element: T) => TKey): Enumerable<Grouping<TKey, T>>;
        GroupBy<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): Enumerable<Grouping<TKey, TElement>>;
        ToDictionary<TKey>(keySelector: (element: T) => TKey): Dictionary<TKey, T>;
    }

    interface OrderedEnumerable<T> extends Enumerable<T> {
        ThenBy<TCompare>(keySelector: (element: T) => TCompare): OrderedEnumerable<T>; // used to incorrectly think this was missing a type argument
    }

    interface Grouping<TKey, TElement> extends Enumerable<TElement> {
        Key(): TKey;
    }

    interface Lookup<TKey, TElement> {
        Count(): number;
        Get(key): Enumerable<any>;
        Contains(key): boolean;
        ToEnumerable(): Enumerable<Grouping<TKey, any>>;
    }

    interface Dictionary<TKey, TValue> {
        Add(key: TKey, value: TValue): void;
        Get(ke: TKey): TValue;
        Set(key: TKey, value: TValue): boolean;
        Contains(key: TKey): boolean;
        Clear(): void;
        Remove(key: TKey): void;
        Count(): number;
        ToEnumerable(): Enumerable<KeyValuePair<TKey, TValue>>;
    }

    interface KeyValuePair<TKey, TValue> {
        Key: TKey;
        Value: TValue;
    }
}

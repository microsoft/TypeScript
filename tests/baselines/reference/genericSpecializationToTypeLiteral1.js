//// [genericSpecializationToTypeLiteral1.ts]
interface IEnumerable<T> {

    zip<TResult>(second: IEnumerable<T>, resultSelector: (first: T, second: T, index: number) => TResult): IEnumerable<TResult>;
    zip<TResult>(second: T[], resultSelector: (first: T, second: T, index: number) => TResult): IEnumerable<TResult>;
    zip<TResult>(...params: any[]): IEnumerable<TResult>; // last one is selector

    merge<TResult>(...params: IEnumerable<T>[]): IEnumerable<T>;
    merge<TResult>(...params: T[][]): IEnumerable<T>;


    concat(...sequences: IEnumerable<T>[]): IEnumerable<T>;
    concat(...sequences: T[]): IEnumerable<T>;

    insert(index: number, second: IEnumerable<T>): IEnumerable<T>;

    sequenceEqual(second: IEnumerable<T>): boolean;
    sequenceEqual<TCompare>(second: IEnumerable<T>, compareSelector: (element: T) => TCompare): boolean;
    sequenceEqual(second: T[]): boolean;
    sequenceEqual<TCompare>(second: T[], compareSelector: (element: T) => TCompare): boolean;   
    
    toDictionary<TKey>(keySelector: (element: T) => TKey): IDictionary<TKey, any>;
    toDictionary<TKey, TValue>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue): IDictionary<TKey, TValue>;
    toDictionary<TKey, TValue, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue, compareSelector: (key: TKey) => TCompare): IDictionary<TKey, TValue>;
}

interface IDictionary<TKey, TValue> {
    toEnumerable(): IEnumerable<{ key: TKey; value: TValue }>;
}

//// [genericSpecializationToTypeLiteral1.js]

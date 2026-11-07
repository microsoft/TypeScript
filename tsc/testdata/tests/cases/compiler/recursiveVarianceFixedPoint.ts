// @strict: true
// @target: es2015
// @noEmit: true

// @filename: storeFirst.ts
export {};

interface Store<T> {
    value: T;
    listener: Listener<T>;
}
type Listener<T> = (batch: Store<T[]>) => void;

declare let strings: Store<string>;
declare let unknowns: Store<unknown>;
declare let stringListener: Listener<string>;
declare let unknownListener: Listener<unknown>;

unknowns = strings; // Error
unknownListener = stringListener; // Error

// @filename: listenerFirst.ts
export {};

type Listener<T> = (batch: Store<T[]>) => void;
interface Store<T> {
    listener: Listener<T>;
    value: T;
}

declare let strings: Store<string>;
declare let unknowns: Store<unknown>;
declare let stringListener: Listener<string>;
declare let unknownListener: Listener<unknown>;

unknownListener = stringListener; // Error
unknowns = strings; // Error

// @filename: columnDefFirst.ts
export {};

interface ColumnDef<Row, Value = unknown> {
    cell?: (column: Column<Row, Value>) => void;
}
interface Column<Row, Value = unknown> {
    accessorFn?: (row: Row) => Value;
    columnDef: ColumnDef<Row, Value>;
}

declare let stringColumn: ColumnDef<{ name: string }, string>;
declare let unknownColumn: ColumnDef<{ name: string }, unknown>;

unknownColumn = stringColumn; // Error
stringColumn = unknownColumn; // Error

// @filename: columnFirst.ts
export {};

interface Column<Row, Value = unknown> {
    columnDef: ColumnDef<Row, Value>;
    accessorFn?: (row: Row) => Value;
}
interface ColumnDef<Row, Value = unknown> {
    cell?: (column: Column<Row, Value>) => void;
}

declare let stringColumn: ColumnDef<{ name: string }, string>;
declare let unknownColumn: ColumnDef<{ name: string }, unknown>;

unknownColumn = stringColumn; // Error
stringColumn = unknownColumn; // Error

// @filename: positiveRecursion.ts
export {};

interface Tree<T> {
    readonly value: T;
    readonly children: readonly Tree<T>[];
    readonly metadata: Map<string, number>;
}
interface Phantom<T> {
    next: Phantom<T>;
}

declare let stringTree: Tree<string>;
declare let unknownTree: Tree<unknown>;
declare let stringPhantom: Phantom<string>;
declare let numberPhantom: Phantom<number>;

unknownTree = stringTree;
stringTree = unknownTree; // Error
stringPhantom = numberPhantom;
numberPhantom = stringPhantom;

// @filename: nestedComposition.ts
export {};

interface Outer<T> {
    value: T;
    next: Inner<Outer<T>>;
}
interface Inner<T> {
    consume: (value: T) => void;
}

declare let strings: Outer<string>;
declare let unknowns: Outer<unknown>;

unknowns = strings; // Error
strings = unknowns; // Error

// @filename: annotations.ts
export {};

interface AnnotatedTree<out T> {
    readonly value: T;
    readonly children: AnnotatedTree<T>[];
}
interface AnnotatedStore<in out T> {
    value: T;
    listener: (batch: AnnotatedStore<T[]>) => void;
}

declare let stringTree: AnnotatedTree<string>;
declare let unknownTree: AnnotatedTree<unknown>;
declare let stringStore: AnnotatedStore<string>;
declare let unknownStore: AnnotatedStore<unknown>;

unknownTree = stringTree;
stringTree = unknownTree; // Error
unknownStore = stringStore; // Error
stringStore = unknownStore; // Error

// @filename: structuralMeasurement.ts
export {};

interface GenericMethod<T> {
    value: T;
    next: <U>(value: U) => GenericMethod<T>;
}
interface Projected<T extends { value: unknown }> {
    value: T["value"];
    next: Projected<T>;
}
interface Method<T> {
    value: T;
    accept(value: Method<T>): void;
}

declare let strings: GenericMethod<string>;
declare let unknowns: GenericMethod<unknown>;
declare let stringMethod: Method<string>;
declare let unknownMethod: Method<unknown>;
declare let projected: Projected<{ value: string; extra: number }>;

unknowns = strings;
strings = unknowns; // Error
unknownMethod = stringMethod;
const widened: Projected<{ value: string }> = projected;

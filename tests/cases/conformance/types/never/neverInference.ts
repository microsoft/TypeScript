// @strict: true

declare function f<T>(x: T[]): T;

let neverArray: never[] = [];

let a1 = f([]);  // {}
let a2 = f(neverArray);  // never

// Repro from #19576

type Comparator<T> = (x: T, y: T) => number;

interface LinkedList<T> {
    comparator: Comparator<T>,
    nodes: Node<T>
}

type Node<T> = { value: T, next: Node<T> } | null

declare function compareNumbers(x: number, y: number): number;
declare function mkList<T>(items: T[], comparator: Comparator<T>): LinkedList<T>;

const list: LinkedList<number> = mkList([], compareNumbers);

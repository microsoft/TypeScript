// @strict: true
// @declaration: true

// @strict: true
// @declaration: true

// Repro from #48363

type Box<T> = {
    get: () => T,
    set: (value: T) => void
}

declare function box<T>(value: T): Box<T>;

const bn1 = box(0);  // Box<number>
const bn2: Box<number> = box(0);  // Ok

const bb1 = box(false);  // Box<boolean>
const bb2: Box<boolean> = box(false);  // Error, box<false> not assignable to Box<boolean>

// Repro from #48150

interface Observable<T>
{
  (): T;
  (value: T): any;
}

declare function observable<T>(value: T): Observable<T>;

const x: Observable<boolean> = observable(false);

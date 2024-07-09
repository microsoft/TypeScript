// @strict: true
// @declaration: true

type Item = { value: string };
type ItemMap<T> = { [P in keyof T]: Item };

declare let x0: keyof any;
declare let x1: { [P in any]: Item };
declare let x2: { [P in string]: Item };
declare let x3: { [P in keyof any]: Item };
declare let x4: ItemMap<any>;

// Repro from #19152

type Data = {
  value: string;
}

type StrictDataMap<T> = {
  [P in keyof T]: Data
}

declare let z: StrictDataMap<any>;
for (let id in z) {
  let data = z[id];
  let x = data.notAValue;  // Error
}

// Issue #46169.
// We want mapped types whose constraint is `keyof T` to
// map over `any` differently, depending on whether `T`
// is constrained to array and tuple types.
type Arrayish<T extends unknown[]> = { [K in keyof T]: T[K] };
type Objectish<T extends unknown> = { [K in keyof T]: T[K] };

// When a mapped type whose constraint is `keyof T` is instantiated,
// `T` may be instantiated with a `U` which is constrained to
// array and tuple types. *Ideally*, when `U` is later instantiated with `any`,
// the result should also be some sort of array; however, at the moment we don't seem
// to have an easy way to preserve that information. More than just that, it would be
// inconsistent for two instantiations of `Objectish<any>` to produce different outputs
// depending on the usage-site. As a result, `IndirectArrayish` does not act like `Arrayish`.
type IndirectArrayish<U extends unknown[]> = Objectish<U>;

function bar(arrayish: Arrayish<any>, objectish: Objectish<any>, indirectArrayish: IndirectArrayish<any>) {
    let arr: any[];
    arr = arrayish;
    arr = objectish;
    arr = indirectArrayish;
}

declare function stringifyArray<T extends readonly any[]>(arr: T): { -readonly [K in keyof T]: string };
let abc: any[] = stringifyArray(void 0 as any);

declare function stringifyPair<T extends readonly [any, any]>(arr: T): { -readonly [K in keyof T]: string };
let def: [any, any] = stringifyPair(void 0 as any);

// Repro from #46582

type Evolvable<E extends Evolver> = {
  [P in keyof E]: never;
};
type Evolver<T extends Evolvable<any> = any> = {
  [key in keyof Partial<T>]: never;
};

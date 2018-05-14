//// [complexTypeExampleNoHang.ts]
interface HCons<Next> {
    readonly next: Next;
}

type Unionize<T> = keyof T extends infer K
  ? K extends string & keyof T ? Record<K, T[K]> : never
  : never;
type KeysRec<T> = T extends Record<any, infer V>
  ? { "1": HKeys<V>, "0": number }[V extends Whatever ? '1' : '0']
  : never;
type HKeys<T> = KeysRec<Unionize<T>>;

type Normalize<T> = T extends HCons<infer N>
  ? { "1": Normalize<N>, "0": Shabadoo }[N extends Whatever ? '1' : '0']
  : never;

type JustNumber<H extends HCons<any>> = number;

type Keys<T> = JustNumber<Normalize<HKeys<T>>>;

//// [complexTypeExampleNoHang.js]

// @strict: true

// Repro from #35655

interface Box<T> { data: T }
type BoxTypes = Box<{ x: string }> | Box<{ y: string }>;

type BoxFactoryFactory<TBox> = TBox extends Box<infer T> ? {
  (arg: T): BoxFactory<TBox> | undefined
} : never;

interface BoxFactory<A> {
  getBox(): A,
}

declare const f: BoxFactoryFactory<BoxTypes>;
const b = f({ x: "", y: "" })?.getBox();
if (b) {
  const x = b.data;
}

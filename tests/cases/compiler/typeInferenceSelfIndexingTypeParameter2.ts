// @strict: true
// @noEmit: true

type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

declare const createComparator: <T, K extends keyof T>(
  property: K,
  comparator: (a: T[K], b: T[K]) => 0 | 1 | -1,
) => Comparator<T>;

declare const concatComparators: <T,>(
  c1: Comparator<T>,
  c2: Comparator<T>,
  ...cRest: Comparator<T>[]
) => Comparator<T>;

declare const compareNumbers: (a: number, b: number) => 0 | 1 | -1;

declare class ModuleGraphConnection {
  clone(): ModuleGraphConnection;
}

const bySourceOrder = createComparator("sourceOrder", compareNumbers);
const byRangeStart = createComparator("rangeStart", compareNumbers);

declare const references: {
  connection: ModuleGraphConnection;
  sourceOrder: number;
  rangeStart: number | undefined;
  defer?: boolean;
}[];

references.sort(concatComparators(bySourceOrder, byRangeStart));

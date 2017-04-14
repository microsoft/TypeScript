// Repro from #14794

interface DataSnapshot<X = {}> {
  child(path: string): DataSnapshot;
}

interface Snapshot<T> extends DataSnapshot {
  child<U extends keyof T>(path: U): Snapshot<T[U]>;
}

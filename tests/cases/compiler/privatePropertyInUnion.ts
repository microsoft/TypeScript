// @strict: true

// Repro from #38236

type Type = string | object;

class SyncableObject {
  private foo: unknown;
}

interface SyncableRef<T extends ISyncableObject> {}

interface ISyncableObject<T = object> extends SyncableObject {}

type __ValueDescriptorType<T extends string | object> = T extends ISyncableObject ? SyncableRef<T> : T;

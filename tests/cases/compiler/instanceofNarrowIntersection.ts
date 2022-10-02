// @strict: true
// @noEmit: true

// repro #50844

interface InstanceOne {
  one(): void
}
interface InstanceTwo {
  two(): void
}

declare const instance: InstanceOne | InstanceTwo
declare const SomeCls: { new (): InstanceOne } & { foo: true }

if (instance instanceof SomeCls) {
  instance.one()
}

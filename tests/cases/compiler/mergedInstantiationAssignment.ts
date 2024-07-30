// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56320

class GenericObject<T = number> {
  set x(x: T) {}
}

const v1 = new GenericObject() as GenericObject &
  ({ a?: string } | { b?: number });
v1.x = 432;

class GenericObjectWithoutSetter<T = number> {
  declare x: T;
}

const v2 = new GenericObjectWithoutSetter() as GenericObjectWithoutSetter &
  ({ a?: string } | { b?: number });
v2.x = 42;

class NormalObject {
  set x(x: number) {}
}

const v3 = new NormalObject() as NormalObject &
  ({ a?: string } | { b?: number });
v3.x = 42;

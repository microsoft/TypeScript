// @strict: true
// @lib: esnext
// @noEmit: true

declare function deprecate<T extends Function>(
  fn: T,
  msg: string,
  code?: string,
): T;

const soonFrozenObjectDeprecation = <T extends object>(
  obj: T,
  name: string,
  code: string,
  note = "",
): T => {
  const message = `${name} will be frozen in future, all modifications are deprecated.${
    note && `\n${note}`
  }`;
  return new Proxy(obj, {
    set: deprecate(
      (target, property, value, receiver) =>
        Reflect.set(target, property, value, receiver),
      message,
      code,
    ),
    defineProperty: deprecate(
      (target, property, descriptor) =>
        Reflect.defineProperty(target, property, descriptor),
      message,
      code,
    ),
    deleteProperty: deprecate(
      (target, property) => Reflect.deleteProperty(target, property),
      message,
      code,
    ),
    setPrototypeOf: deprecate(
      (target, proto) => Reflect.setPrototypeOf(target, proto),
      message,
      code,
    ),
  });
};
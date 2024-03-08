// @strict: true
// @noEmit: true

type AnyObject = Record<string, any>;
type State = AnyObject;

declare function hasOwnProperty<T extends AnyObject>(
  object: T,
  prop: PropertyKey,
): prop is keyof T;

interface Store<S = State> {
  setState<K extends keyof S>(key: K, value: S[K]): void;
}

export function syncStoreProp<
  S extends State,
  P extends Partial<S>,
  K extends keyof S,
>(store: Store<S>, props: P, key: K) {
  const value = hasOwnProperty(props, key) ? props[key] : undefined;

  if (value === undefined) return;
  store.setState(key, value);

  if (value === undefined) return;
  store.setState(key, value);
}

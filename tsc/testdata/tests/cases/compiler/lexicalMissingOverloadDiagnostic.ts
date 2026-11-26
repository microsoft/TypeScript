// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Relating Nested to Inline reads the return type of the call being resolved.
// A hidden re-entry of that call still reports that no overload matches, and
// the call has the type of the last overload tried.

interface ConfigValue<T> {
  children?: 'inline';
  json?: (n: T) => void;
}
declare class Base {
  describe(): {};
  config<Config extends ConfigValue<this>>(type: symbol, config: Config): {};
  config<Config extends ConfigValue<this>>(type: string, config: Config): { kind?: Config };
}
declare const pinSchema: (n: Inline) => void;
declare class Inline extends Base {
  describe(): { kind?: { children: 'inline' } };
}
class Nested extends Base {
  describe() {
    return this.config('kind', { json: pinSchema }); // error
  }
}

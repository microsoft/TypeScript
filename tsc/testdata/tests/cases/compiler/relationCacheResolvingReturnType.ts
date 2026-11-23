// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated

// Relating PinnedNested to PinnedLine reads the return type of
// PinnedNested.$config, which is being inferred from the call that relates
// them. Results computed while that return type reads as any must not be
// cached for the argument's object literal type.

interface Schema<N> { readonly check?: (n: N) => void }
interface ConfigValue<T, Type> {
  readonly children?: 'inline';
  readonly extends?: abstract new () => LNode;
  readonly json?: Schema<T>;
}
type BaseConfig = { readonly [K in string]?: ConfigValue<LNode, string> };
type ConfigRecord<Type extends string, Config> =
  Config extends { extends: abstract new (...args: never) => infer Inst extends LNode }
    ? ReturnType<Inst['$config']> & { readonly [K in Type]?: Config }
    : {};

declare class LNode {
  $config(): BaseConfig;
  config<const Config extends ConfigValue<this, string>>(type: symbol, config: Config): {};
  config<Type extends string, const Config extends ConfigValue<this, Type>>(type: Type, config: Config): ConfigRecord<Type, Config>;
}
declare class ElementNode extends LNode {}
declare function nodeSchema<N>(): Schema<N>;

const pinSchema = nodeSchema<PinnedLine>();
class PinnedLine extends ElementNode {
  $config() {
    return this.config('pin_block', { children: 'inline', extends: ElementNode, json: pinSchema });
  }
}
class PinnedNested extends ElementNode {
  $config() {
    return this.config('pin_block', { extends: ElementNode, json: pinSchema }); // error
  }
}

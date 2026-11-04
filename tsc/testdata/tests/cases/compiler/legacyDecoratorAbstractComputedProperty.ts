// @target: es2022
// @experimentalDecorators: true
// @useDefineForClassFields: true
// @noTypesAndSymbols: true

declare function dec(target: object, key: PropertyKey): void;
declare const sym: unique symbol;

abstract class Base {
  @dec abstract [sym]: string;
  @dec abstract ["lit"]: string;
}

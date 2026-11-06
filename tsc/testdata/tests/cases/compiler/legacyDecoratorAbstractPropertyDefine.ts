// @target: es2022
// @experimentalDecorators: true
// @useDefineForClassFields: true
// @noTypesAndSymbols: true

function dec(target: object, key: string) {
  Object.defineProperty(target, key, { get: () => 'from prototype', configurable: true });
}

abstract class Base {
  @dec abstract data: string;
}

class Sub extends Base {
  declare data: string;
}

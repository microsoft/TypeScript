// @lib: esnext
// @noUnusedLocals:true
// @target: esnext

export class Polling {
  private async *[Symbol.asyncIterator]() {}
  private *[Symbol.iterator]() {}

  async loop() {
    for await (const updates of this) {
      void updates
    }
  }
  syncLoop() {
    for (const updates of this) {
      void updates
    }
  }
}

export class WellknownSymbolMethods {
  private async *[Symbol.asyncIterator]() {
    yield "hello";
  }

  private static [Symbol.hasInstance](instance: unknown) {
    return Array.isArray(instance);
  }

  private get [Symbol.isConcatSpreadable]() {
    return false
  }
  
  private *[Symbol.iterator]() {
    yield "hello";
  }

  private get [Symbol.match]() {
    return false;
  }

  private *[Symbol.matchAll](str: string) {
    for (const n of str.matchAll(/[0-9]+/g))
      yield n[0];
  }

  private [Symbol.replace](str: string) {
    return `s/${str}/foo/g`;
  }

  private [Symbol.search](str: string) {
    return str.indexOf('foo');
  }

  private [Symbol.split](str: string) {
    return 'foo'
  }

  private static get [Symbol.species]() { return Array; }

  private [Symbol.toPrimitive](hint: any) {
    if (hint === 'number') {
      return 42;
    }
    return null;
  }

  private get [Symbol.toStringTag]() {
    return 'foo';
  }

  private get [Symbol.unscopables]() {
    return {};
  }
}

export class WellknownSymbolProperties {
  private [Symbol.asyncIterator] = function*() {
    yield "hello";
  }

  private static [Symbol.hasInstance] = (instance: unknown) => {
    return Array.isArray(instance);
  }

  private [Symbol.isConcatSpreadable] = false;
  
  private [Symbol.iterator] = function*() {
    yield "hello";
  }

  private [Symbol.match] = false;

  private [Symbol.matchAll] = function*(str: string) {
    for (const n of str.matchAll(/[0-9]+/g))
      yield n[0];
  }

  private [Symbol.replace] = (str: string) => {
    return `s/${str}/foo/g`;
  }

  private [Symbol.search] = (str: string) => {
    return str.indexOf('foo');
  }

  private [Symbol.split] = (str: string) => {
    return 'foo'
  }

  private static [Symbol.species] = Array;

  private [Symbol.toPrimitive] = (hint: any) => {
    if (hint === 'number') {
      return 42;
    }
    return null;
  }

  private [Symbol.toStringTag] = 'foo';

  private [Symbol.unscopables] = {};
}

const MyIterator = Symbol();
export function testLocalSymbols() {
  const Symbol = {
    iterator: MyIterator
  };

  return class Foo{
    private *[Symbol.iterator]() {
      yield 1;
    }
  }
}

const iteratorSymbol = Symbol.iterator;
export class C {
  private *[iteratorSymbol]() {
    
  }
}
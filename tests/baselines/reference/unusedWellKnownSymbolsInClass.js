//// [unusedWellKnownSymbolsInClass.ts]
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

//// [unusedWellKnownSymbolsInClass.js]
export class Polling {
    async *[Symbol.asyncIterator]() { }
    *[Symbol.iterator]() { }
    async loop() {
        for await (const updates of this) {
            void updates;
        }
    }
    syncLoop() {
        for (const updates of this) {
            void updates;
        }
    }
}
export class WellknownSymbolMethods {
    async *[Symbol.asyncIterator]() {
        yield "hello";
    }
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
    get [Symbol.isConcatSpreadable]() {
        return false;
    }
    *[Symbol.iterator]() {
        yield "hello";
    }
    get [Symbol.match]() {
        return false;
    }
    *[Symbol.matchAll](str) {
        for (const n of str.matchAll(/[0-9]+/g))
            yield n[0];
    }
    [Symbol.replace](str) {
        return `s/${str}/foo/g`;
    }
    [Symbol.search](str) {
        return str.indexOf('foo');
    }
    [Symbol.split](str) {
        return 'foo';
    }
    static get [Symbol.species]() { return Array; }
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return 42;
        }
        return null;
    }
    get [Symbol.toStringTag]() {
        return 'foo';
    }
    get [Symbol.unscopables]() {
        return {};
    }
}
export class WellknownSymbolProperties {
    [Symbol.asyncIterator] = function* () {
        yield "hello";
    };
    static [Symbol.hasInstance] = (instance) => {
        return Array.isArray(instance);
    };
    [Symbol.isConcatSpreadable] = false;
    [Symbol.iterator] = function* () {
        yield "hello";
    };
    [Symbol.match] = false;
    [Symbol.matchAll] = function* (str) {
        for (const n of str.matchAll(/[0-9]+/g))
            yield n[0];
    };
    [Symbol.replace] = (str) => {
        return `s/${str}/foo/g`;
    };
    [Symbol.search] = (str) => {
        return str.indexOf('foo');
    };
    [Symbol.split] = (str) => {
        return 'foo';
    };
    static [Symbol.species] = Array;
    [Symbol.toPrimitive] = (hint) => {
        if (hint === 'number') {
            return 42;
        }
        return null;
    };
    [Symbol.toStringTag] = 'foo';
    [Symbol.unscopables] = {};
}
const MyIterator = Symbol();
export function testLocalSymbols() {
    const Symbol = {
        iterator: MyIterator
    };
    return class Foo {
        *[Symbol.iterator]() {
            yield 1;
        }
    };
}
const iteratorSymbol = Symbol.iterator;
export class C {
    *[iteratorSymbol]() {
    }
}

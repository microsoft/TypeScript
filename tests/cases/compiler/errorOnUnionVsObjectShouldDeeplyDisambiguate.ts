interface Stuff {
    a?: () => Promise<number[]>;
    b: () => Promise<string>;
    c: () => Promise<string>;
    d: () => Promise<string>;
    e: () => Promise<string>;
    f: () => Promise<string>;
    g: () => Promise<string>;
    h: () => Promise<string>;
    i: () => Promise<string>;
    j: () => Promise<string>;
    k: () => Promise<number>;
  }
  
  function foo(): Stuff | string {
    return {
      a() { return [123] },
      b: () => "hello",
      c: () => "hello",
      d: () => "hello",
      e: () => "hello",
      f: () => "hello",
      g: () => "hello",
      h: () => "hello",
      i: () => "hello",
      j: () => "hello",
      k: () => 123
    }
  }
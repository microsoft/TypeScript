// @strict: true

let _: MethodMapper<'foo' | 'bar', {foo: string, bar: number}, number[]> = {
  foo: (arg: { foo: string; bar: number; }): number[] => {
    throw new Error("Function not implemented.");
  },
  bar: (arg: { foo: string; bar: number; }): number[] => {
    throw new Error("Function not implemented.");
  }
}

let $ = (): MethodMapper<'foo' | 'bar', {foo: string, bar: number}, number[]> => {
  const foo =  (arg: { foo: string; bar: number; }): number[] => {
    throw new Error("Function not implemented.");
  };
  const bar =  (arg: { foo: string; bar: number; }): number[] => {
    throw new Error("Function not implemented.");
  };
  return {
    foo,
    bar
  }
};

let a = (): MethodMapper<'method'> => {
  const method = (): void => {}
  return {method}
};

let err = (): MethodMapper<'method'> => {
  const err = (): void => {}
  return {
    err // Error
  }
}

// Repro from #49811

const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
] as const;

type Method = typeof methods[number];

class Router implements MethodMapper<Method> {
  delete(): void {
  }

  get(): void {
  }

  head(): void {
  }

  options(): void {
  }

  patch(): void {
  }

  post(): void {
  }

  put(): void {
  }

}

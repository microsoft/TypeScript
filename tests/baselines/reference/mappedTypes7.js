//// [mappedTypes7.ts]
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


//// [mappedTypes7.js]
"use strict";
var _ = {
    foo: function (arg) {
        throw new Error("Function not implemented.");
    },
    bar: function (arg) {
        throw new Error("Function not implemented.");
    }
};
var $ = function () {
    var foo = function (arg) {
        throw new Error("Function not implemented.");
    };
    var bar = function (arg) {
        throw new Error("Function not implemented.");
    };
    return {
        foo: foo,
        bar: bar
    };
};
var a = function () {
    var method = function () { };
    return { method: method };
};
var err = function () {
    var err = function () { };
    return {
        err: err // Error
    };
};
// Repro from #49811
var methods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "HEAD",
];
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.prototype["delete"] = function () {
    };
    Router.prototype.get = function () {
    };
    Router.prototype.head = function () {
    };
    Router.prototype.options = function () {
    };
    Router.prototype.patch = function () {
    };
    Router.prototype.post = function () {
    };
    Router.prototype.put = function () {
    };
    return Router;
}());

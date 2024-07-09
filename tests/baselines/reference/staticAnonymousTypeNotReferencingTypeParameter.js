//// [tests/cases/compiler/staticAnonymousTypeNotReferencingTypeParameter.ts] ////

//// [staticAnonymousTypeNotReferencingTypeParameter.ts]
// This test case is a condensed version of Angular 2's ListWrapper. Prior to #7448
// this would cause the compiler to run out of memory.

function outer<T>(x: T) {
  class Inner {
    static y: T = x;
  }
  return Inner;
}
let y: number = outer(5).y;

class ListWrapper2 {
  static clone<T>(dit: typeof ListWrapper2, array: T[]): T[] { return array.slice(0); }
  static reversed<T>(dit: typeof ListWrapper2, array: T[]): T[] {
    var a = ListWrapper2.clone(dit, array);
    return a;
  }
}
namespace tessst {
    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function funkyFor<T, U>(array: T[], callback: (element: T, index: number) => U): U {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
}
interface Scanner {
  scanRange<T>(start: number, length: number, callback: () => T): T;
}
class ListWrapper {
  // JS has no way to express a statically fixed size list, but dart does so we
  // keep both methods.
  static createFixedSize(dit: typeof ListWrapper, size: number): any[] { return new Array(size); }
  static createGrowableSize(dit: typeof ListWrapper, size: number): any[] { return new Array(size); }
  static clone<T>(dit: typeof ListWrapper, array: T[]): T[] { return array.slice(0); }
  static forEachWithIndex<T>(dit: typeof ListWrapper, array: T[], fn: (t: T, n: number) => void) {
    for (var i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
  }
  static first<T>(dit: typeof ListWrapper, array: T[]): T {
    if (!array) return null;
    return array[0];
  }
  static last<T>(dit: typeof ListWrapper, array: T[]): T {
    if (!array || array.length == 0) return null;
    return array[array.length - 1];
  }
  static indexOf<T>(dit: typeof ListWrapper, array: T[], value: T, startIndex: number = 0): number {
    return array.indexOf(value, startIndex);
  }
  static contains<T>(dit: typeof ListWrapper, list: T[], el: T): boolean { return list.indexOf(el) !== -1; }
  static reversed<T>(dit: typeof ListWrapper, array: T[]): T[] {
    var a = ListWrapper.clone(dit, array);
    let scanner: Scanner;
    scanner.scanRange(3, 5, () => {  });
    return tessst.funkyFor(array, t => t.toString()) ? a.reverse() : a;
  }
  static concat(dit: typeof ListWrapper, a: any[], b: any[]): any[] { return a.concat(b); }
  static insert<T>(dit: typeof ListWrapper, list: T[], index: number, value: T) { list.splice(index, 0, value); }
  static removeAt<T>(dit: typeof ListWrapper, list: T[], index: number): T {
    var res = list[index];
    list.splice(index, 1);
    return res;
  }
  static removeAll<T>(dit: typeof ListWrapper, list: T[], items: T[]) {
    for (var i = 0; i < items.length; ++i) {
      var index = list.indexOf(items[i]);
      list.splice(index, 1);
    }
  }
  static remove<T>(dit: typeof ListWrapper, list: T[], el: T): boolean {
    var index = list.indexOf(el);
    if (index > -1) {
      list.splice(index, 1);
      return true;
    }
    return false;
  }
  static clear(dit: typeof ListWrapper, list: any[]) { list.length = 0; }
  static isEmpty(dit: typeof ListWrapper, list: any[]): boolean { return list.length == 0; }
  static fill(dit: typeof ListWrapper, list: any[], value: any, start: number = 0, end: number = null) {
    list.fill(value, start, end === null ? list.length : end);
  }
  static equals(dit: typeof ListWrapper, a: any[], b: any[]): boolean {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  static slice<T>(dit: typeof ListWrapper, l: T[], from: number = 0, to: number = null): T[] {
    return l.slice(from, to === null ? undefined : to);
  }
  static splice<T>(dit: typeof ListWrapper, l: T[], from: number, length: number): T[] { return l.splice(from, length); }
  static sort<T>(dit: typeof ListWrapper, l: T[], compareFn?: (a: T, b: T) => number) {
    if (isPresent(compareFn)) {
      l.sort(compareFn);
    } else {
      l.sort();
    }
  }
  static toString<T>(dit: typeof ListWrapper, l: T[]): string { return l.toString(); }
  static toJSON<T>(dit: typeof ListWrapper, l: T[]): string { return JSON.stringify(l); }

  static maximum<T>(dit: typeof ListWrapper, list: T[], predicate: (t: T) => number): T {
    if (list.length == 0) {
      return null;
    }
    var solution: T = null;
    var maxValue = -Infinity;
    for (var index = 0; index < list.length; index++) {
      var candidate = list[index];
      if (isBlank(candidate)) {
        continue;
      }
      var candidateValue = predicate(candidate);
      if (candidateValue > maxValue) {
        solution = candidate;
        maxValue = candidateValue;
      }
    }
    return solution;
  }
}
let cloned = ListWrapper.clone(ListWrapper, [1,2,3,4]);
declare function isBlank(x: any): boolean;
declare function isPresent<T>(compareFn?: (a: T, b: T) => number): boolean;
interface Array<T> {
	fill(value: any, start: number, end: number): void;
}

//// [staticAnonymousTypeNotReferencingTypeParameter.js]
// This test case is a condensed version of Angular 2's ListWrapper. Prior to #7448
// this would cause the compiler to run out of memory.
function outer(x) {
    var Inner = /** @class */ (function () {
        function Inner() {
        }
        Inner.y = x;
        return Inner;
    }());
    return Inner;
}
var y = outer(5).y;
var ListWrapper2 = /** @class */ (function () {
    function ListWrapper2() {
    }
    ListWrapper2.clone = function (dit, array) { return array.slice(0); };
    ListWrapper2.reversed = function (dit, array) {
        var a = ListWrapper2.clone(dit, array);
        return a;
    };
    return ListWrapper2;
}());
var tessst;
(function (tessst) {
    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    function funkyFor(array, callback) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                var result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    tessst.funkyFor = funkyFor;
})(tessst || (tessst = {}));
var ListWrapper = /** @class */ (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (dit, size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (dit, size) { return new Array(size); };
    ListWrapper.clone = function (dit, array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (dit, array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (dit, array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (dit, array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (dit, array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (dit, list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (dit, array) {
        var a = ListWrapper.clone(dit, array);
        var scanner;
        scanner.scanRange(3, 5, function () { });
        return tessst.funkyFor(array, function (t) { return t.toString(); }) ? a.reverse() : a;
    };
    ListWrapper.concat = function (dit, a, b) { return a.concat(b); };
    ListWrapper.insert = function (dit, list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (dit, list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (dit, list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (dit, list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (dit, list) { list.length = 0; };
    ListWrapper.isEmpty = function (dit, list) { return list.length == 0; };
    ListWrapper.fill = function (dit, list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (dit, a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (dit, l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (dit, l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (dit, l, compareFn) {
        if (isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (dit, l) { return l.toString(); };
    ListWrapper.toJSON = function (dit, l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (dit, list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    return ListWrapper;
}());
var cloned = ListWrapper.clone(ListWrapper, [1, 2, 3, 4]);

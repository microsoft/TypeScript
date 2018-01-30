// @strict: true

// Repro from #20840

function function1<T extends 'a' | 'b'>(key: T) {
  switch (key) {
    case 'a':
      key.toLowerCase();
      break;
    default:
      key.toLowerCase();
      break;
  }
}

// #20375

declare var n: never;
declare function never(never: never): never;
function f<T extends 'a' | 'b' | 'c'>(t: T): void {
    switch (t) {
        // in a/b/c branches, assignment should fail as t narrows to a/b/c
        // in default branch, assignment should be fine
        case 'a': n = t; break;
        case 'b': n = t; break;
        case 'c': n = t; break;
        default: n = t; break;
    }
}


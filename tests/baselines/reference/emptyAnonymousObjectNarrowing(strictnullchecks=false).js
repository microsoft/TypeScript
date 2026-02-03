//// [tests/cases/compiler/emptyAnonymousObjectNarrowing.ts] ////

//// [emptyAnonymousObjectNarrowing.ts]
declare let nonNull: {};
if (nonNull === "foo") {
  nonNull;
}
else {
  nonNull;
}

declare let obj: { a: string };
if (nonNull === obj) {
  nonNull;
}
else {
  nonNull;
}

function f1<T>(x: T) {
  if (nonNull === x) {
    nonNull;
  }
  else {
    nonNull;
  }
}

function f2<T extends object>(x: T) {
  if (nonNull === x) {
    nonNull;
  }
  else {
    nonNull;
  }
}

declare let union: "xyz" | { a: string } | undefined;
if (nonNull === union) {
  nonNull;
}
else {
  nonNull;
}

if (nonNull === undefined) {
  nonNull;
}
else {
  nonNull;
}

if (nonNull === null) {
  nonNull;
}
else {
  nonNull;
}

if (nonNull == undefined) {
  nonNull;
}
else {
  nonNull;
}

// Repro from #50567
const foo = (value: unknown): string => {
  if (!value) {
      return 'foo';
  }
  if (value === 'xyz') {
      return value; // Type '{}' is not assignable to type 'string'.
  }
  return '';
};


//// [emptyAnonymousObjectNarrowing.js]
if (nonNull === "foo") {
    nonNull;
}
else {
    nonNull;
}
if (nonNull === obj) {
    nonNull;
}
else {
    nonNull;
}
function f1(x) {
    if (nonNull === x) {
        nonNull;
    }
    else {
        nonNull;
    }
}
function f2(x) {
    if (nonNull === x) {
        nonNull;
    }
    else {
        nonNull;
    }
}
if (nonNull === union) {
    nonNull;
}
else {
    nonNull;
}
if (nonNull === undefined) {
    nonNull;
}
else {
    nonNull;
}
if (nonNull === null) {
    nonNull;
}
else {
    nonNull;
}
if (nonNull == undefined) {
    nonNull;
}
else {
    nonNull;
}
// Repro from #50567
var foo = function (value) {
    if (!value) {
        return 'foo';
    }
    if (value === 'xyz') {
        return value; // Type '{}' is not assignable to type 'string'.
    }
    return '';
};

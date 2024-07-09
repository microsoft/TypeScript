// @strictNullChecks: true,false

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

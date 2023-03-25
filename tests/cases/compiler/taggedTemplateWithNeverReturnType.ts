function fail(strings?: TemplateStringsArray): never {
  throw "";
}

let a!: number | string;

if (typeof a === "string") {
  fail``;
}

const b: number = a;

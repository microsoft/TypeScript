function assert(strings: TemplateStringsArray, condition: boolean): asserts condition {}

let a!: number | string;

if (typeof a === "string") {
  assert`uh-oh: ${false}`;
}

const b: number = a;

// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60130

function assert<C>(c: C): asserts c {
  if (!c) {
    throw new TypeError("Assertion failed");
  }
}

export function test1(lines: string[]): string[] {
  let func: {
    name: string;
    lines: string[];
  } | null = null;

  for (const line of lines) {
    if (Math.random() < 0.5) {
      func = {
        name: "qwer",
        lines: [line],
      };
    } else {
      assert(func);
      const { name, lines } = func;
      lines.push(line);
      assert(name !== "abc");
    }
  }
  if (func) return func.lines;
  return lines;
}

declare function inferStuff<T>(arg: T, checkStuff?: boolean): T;

export function test2(lines: string[]): string[] {
  let func: {
    name: string;
  } | null = null;

  for (const _ of lines) {
    if (Math.random() < 0.5) {
      func = {
        name: "qwer",
      };
    } else {
      if (func) {
        const { name } = func;
        func = inferStuff(
          {
            name: "other",
          },
          name === "abc",
        );
      }
    }
  }

  return lines;
}
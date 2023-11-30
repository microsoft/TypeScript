// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

function test1(arg: [[undefined, Error] | [number, undefined]]) {
  const [[p1, p1Error]] = arg;

  if (p1Error) {
    return;
  }

  p1;
}

function test2([[p1, p1Error]]: [[undefined, Error] | [number, undefined]]) {
  if (p1Error) {
    return;
  }

  p1;
}

async function myAllSettled<T extends readonly unknown[]>(fn: () => T) {
  const promises = await Promise.allSettled(fn());

  return promises.map((result) =>
    result.status === "fulfilled"
      ? [result.value, undefined]
      : [undefined, new Error(String(result.reason))],
  ) as { [K in keyof T]: [Awaited<T[K]>, undefined] | [undefined, Error] };
}

async function test3() {
  const [[p1, p1Error], _] = await myAllSettled(
    () => [Promise.resolve(0), Promise.reject(1)] as const,
  );

  if (p1Error) return;

  p1;
}

function test4([[p1, p1Error]]: [[undefined, Error] | [number, undefined]]) {
  if (Math.random()) {
    p1 = undefined;
  }
  if (p1Error) {
    return;
  }

  p1;
}

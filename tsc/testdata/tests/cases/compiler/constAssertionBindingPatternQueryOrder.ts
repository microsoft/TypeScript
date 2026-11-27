// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true
// @checkOrder: default, typesfirst

declare function settle<T extends readonly unknown[]>(fn: () => T): Promise<{ [K in keyof T]: [Awaited<T[K]>] }>;

async function f() {
  const [[a], b] = await settle(() => [Promise.resolve(0), Promise.reject(1)] as const);
}

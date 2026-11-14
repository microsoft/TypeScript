// @strict: true
// @target: esnext
// @noEmit: true
// @checkOrder: default,typesfirst

// Reduced from capnweb's RpcStub types (cloudflare-os). Measuring the variance
// of Stubify enters a circularity (Stubify -> Stub -> Provider ->
// MethodOrProperty -> Result -> RpcPromise -> Stubify) whose canonical entry is
// Stub, so the measurement from Stubify is discarded and the circularity
// measured again from Stub. The discarded measurement once ran to completion,
// which on the full types took long enough to exceed the instantiation limit.

interface StubBase<T = unknown> {
  brand: T;
}
type Stub<T> = T extends object ? Provider<T> & StubBase<T> : StubBase<T>;
type Stubify<T> = T extends StubBase<any> ? T : T extends Function ? Stub<T> : T;
type RpcPromise<T> = Promise<Stubify<T>> & Provider<T> & StubBase<T>;
type Result<R> = R extends StubBase<infer U> ? Result<U> : RpcPromise<R>;
type MethodOrProperty<V> = V extends (...args: infer P) => infer R ? (...args: P) => Result<Awaited<R>> : Result<Awaited<V>>;
type Provider<T> = { [K in keyof T]: MethodOrProperty<T[K]> };

function f<T>(x: Stubify<T>, y: Stubify<T | undefined>) {
  y = x;
  x = y;
}

declare const api: Stub<{ sub(): Promise<Stub<{}>> }>;
export async function g() {
  await api.sub();
  api.sub().then(s => s);
}

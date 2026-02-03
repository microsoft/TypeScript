// @strict: true
// @target: es2018
// @lib: esnext
// @noEmit: true

type Stream1<T_Sync, T_Async> = Iterable<T_Sync> & AsyncIterable<T_Async>;

class A1 {}
class B1 {}

async function loop1(stream: Stream1<A1, B1>) {
  for await (const b of stream) {}
}

type Stream2<T_Sync, T_Async> = Iterable<T_Sync> & AsyncIterable<T_Async>;

class A2 {}
class B2 {}

async function loop2(stream: Stream2<A2, B2>) {
  for (const a of stream) {}
}

type Stream3<T_Sync, T_Async> = Iterable<T_Sync> & AsyncIterable<T_Async>;

class A3 {}
class B3 {}

async function loop3(stream: Stream3<A3, B3>) {
  for await (const b of stream) {}

  for (const a of stream) {}
}

type Stream4<T_Sync, T_Async> = Iterable<T_Sync> & AsyncIterable<T_Async>;

class A4 {}
class B4 {}

// verify that resolving sync iteration first doesn't spoil the type for async iteration
async function loop4(stream: Stream4<A4, B4>) {
  for (const a of stream) {}

  for await (const b of stream) {}
}
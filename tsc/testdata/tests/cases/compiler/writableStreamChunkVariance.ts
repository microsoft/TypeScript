// @strict: true
// @target: esnext
// @lib: esnext,dom

const stream: WritableStream<{ a: string }> = new WritableStream<{ a: string; b: string }>();
stream.getWriter().write({ a: "string" });

const writable = new WritableStream<{ a: string; b: string }>();
new ReadableStream<{ a: string }>().pipeTo(writable);

const widened: WritableStream<{ a: string; b: string }> = new WritableStream<{ a: string }>();
new ReadableStream<{ a: string; b: string }>().pipeTo(new WritableStream<{ a: string }>());

// @lib: esnext, dom
// @strict: true, false
// @skipDefaultLibCheck: false
// @skipLibCheck: false
// @noEmit: true

const promise = Promise.resolve(0);
const response: Promise<Awaited<Response>> = fetch("");

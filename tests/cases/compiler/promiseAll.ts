// @target: esnext
// https://github.com/microsoft/TypeScript/issues/37856

var p = Promise.all([Promise.reject()]).catch(() => [0]);
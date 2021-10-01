// @module: esnext,system,es2020
// @strict: true

declare global { interface ImportMeta {foo?: () => void} };

if (import.meta.foo) {
  import.meta.foo();
}

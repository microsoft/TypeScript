/// <reference path="fourslash.ts" />

// @Filename: /app.ts
//// export function he/**/llo() {};

// @Filename: /re-export.ts
//// export const services = { app: setup(() => import('./app')) }
//// function setup<T>(importee: () => Promise<T>): T { return {} as any }

// @Filename: /indirect-use.ts
//// import("./re-export").then(mod => mod.services.app.hello());

// @Filename: /direct-use.ts
//// async function main() {
////     const mod = await import("./app")
////     mod.hello();
//// }

verify.baselineFindAllReferences("");

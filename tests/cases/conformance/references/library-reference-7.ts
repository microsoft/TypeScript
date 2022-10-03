// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /

// Secondary references are possible

// @filename: /src/node_modules/jquery/index.d.ts
declare var $: { foo(): void };

// @filename: /src/consumer.ts
/// <reference types="jquery" />
$.foo();

// @noImplicitReferences: true
// @traceResolution: true
// @typeRoots: /src/types

// We can find typings in the ./types folder

// @filename: /src/types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /src/consumer.ts
/// <reference types="jquery" />
$.foo();

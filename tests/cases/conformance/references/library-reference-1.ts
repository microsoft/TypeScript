// @noImplicitReferences: true
// @traceResolution: true
// @typesRoot: /types

// We can find typings in the ./types folder

// @filename: /types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /consumer.ts
/// <reference types="jquery" />
$.foo();

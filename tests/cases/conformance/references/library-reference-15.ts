// @noImplicitReferences: true
// @traceResolution: true
// @types: jquery

// @filename: /a/types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /a/b/consumer.ts
$.foo();

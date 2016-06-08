// @noImplicitReferences: true
// @traceResolution: true
// @types: jquery
// @typesRoot: /a
// @currentDirectory: test

// @filename: /a/types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /a/b/consumer.ts
$.foo();

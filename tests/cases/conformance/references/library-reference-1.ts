// @noImplicitReferences: true

// We can find typings in the ./typings folder

// @filename: typings/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: consumer.ts
/// <reference library="jquery" />
$.foo();

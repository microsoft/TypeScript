// @noImplicitReferences: true

// Secondary references are possible

// @filename: src/node_modules/jquery/index.d.ts
declare var $: { foo(): void };

// @filename: src/consumer.ts
/// <reference library="jquery" />
$.foo();

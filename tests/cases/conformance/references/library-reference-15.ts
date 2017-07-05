// @noImplicitReferences: true
// @traceResolution: true
// @types: jquery
// @currentDirectory: /a
// @typeRoots: types

// @filename: /a/types/jquery/index.d.ts
declare var $: { foo(): void };

// @filename: /a/types/jquery2/index.d.ts
declare var $2: { foo(): void };

// @filename: /a/b/consumer.ts
$.foo(); // should OK
$2.foo(); // should error
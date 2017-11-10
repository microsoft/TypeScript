// @noImplicitReferences: true
// @traceResolution: true
// @typeRoots: /types
// @currentDirectory: /test

// package.json in a primary reference can refer to another file

// @filename: /types/jquery/package.json
{
    "types": "jquery.d.ts"
}

// @filename: /types/jquery/jquery.d.ts
declare var $: { foo(): void };


// @filename: /consumer.ts
/// <reference types="jquery" />
$.foo();

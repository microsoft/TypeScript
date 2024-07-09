// @noImplicitReferences: true
// @traceResolution: true
// @typeRoots: /foo/types

// package.json in a primary reference can refer to another file

// @filename: /foo/types/jquery/package.json
{
    "typings": "jquery.d.ts"
}

// @filename: /foo/types/jquery/jquery.d.ts
declare var $: { foo(): void };


// @filename: /foo/consumer.ts
/// <reference types="jquery" />
$.foo();

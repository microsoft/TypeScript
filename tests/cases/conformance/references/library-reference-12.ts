// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /

// package.json in a secondary reference can refer to another file

// @filename: /a/node_modules/jquery/package.json
{
    "types": "dist/jquery.d.ts"
}

// @filename: /a/node_modules/jquery/dist/jquery.d.ts
declare var $: { foo(): void };


// @filename: /a/b/consumer.ts
/// <reference types="jquery" />
$.foo();

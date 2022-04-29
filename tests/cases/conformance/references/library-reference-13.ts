// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory: /

// load type declarations from types section of tsconfig

// @filename: /a/tsconfig.json
{
    "compilerOptions": {
        "types": [ "jquery" ],
        "typeRoots": ["/a/types"]
    }
}

// @filename: /a/types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /a/b/consumer.ts
$.foo();

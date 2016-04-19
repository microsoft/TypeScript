// @noImplicitReferences: true
// @traceResolution: true

// load type declarations from types section of tsconfig

// @filename: /a/tsconfig.json
{
    "compilerOptions": {
        "types": [ "jquery" ]
    }
}

// @filename: /a/types/jquery/index.d.ts
declare var $: { foo(): void };


// @filename: /a/b/consumer.ts
$.foo();

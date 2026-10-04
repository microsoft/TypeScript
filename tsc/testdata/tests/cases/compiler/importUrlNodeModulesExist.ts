// @traceResolution: true

// @filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0" }

// @filename: /node_modules/foo/index.d.ts
export declare function useFoo(): string;

// @filename: /src/index.ts
import "https://deno.land/std@0.208.0/path/mod.ts"


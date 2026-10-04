// @strict: true
// @noImplicitReferences: true

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0" }

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/foo/index.d.ts
import "globals";
export declare function useFoo(): typeof myGlobal;

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/globals/package.json
{ "name": "globals", "version": "1.0.0" }

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/globals/index.d.ts
declare var myGlobal: string;

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0" }

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/foo/index.d.ts
import "globals";
export declare function useFoo(): typeof myGlobal;

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/globals/package.json
{ "name": "globals", "version": "2.0.0" }

// @filename: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/globals/index.d.ts
declare var myGlobal: number;

// @filename: /node_modules/.pnpm/bar@1.0.0/node_modules/bar/package.json
{ "name": "bar", "version": "1.0.0" }

// @filename: /node_modules/.pnpm/bar@1.0.0/node_modules/bar/index.d.ts
import { useFoo } from "foo";
export declare function useBar(): ReturnType<typeof useFoo>;

// @filename: /node_modules/.pnpm/baz@1.0.0/node_modules/baz/package.json
{ "name": "baz", "version": "1.0.0" }

// @filename: /node_modules/.pnpm/baz@1.0.0/node_modules/baz/index.d.ts
import { useFoo } from "foo";
export declare function useBaz(): ReturnType<typeof useFoo>;

// @link: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/foo -> /node_modules/.pnpm/bar@1.0.0/node_modules/foo
// @link: /node_modules/.pnpm/foo@1.0.0+globals@1.0.0/node_modules/globals -> /node_modules/.pnpm/bar@1.0.0/node_modules/globals

// @link: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/foo -> /node_modules/.pnpm/baz@1.0.0/node_modules/foo
// @link: /node_modules/.pnpm/foo@1.0.0+globals@2.0.0/node_modules/globals -> /node_modules/.pnpm/baz@1.0.0/node_modules/globals

// @link: /node_modules/.pnpm/bar@1.0.0/node_modules/bar -> /node_modules/bar
// @link: /node_modules/.pnpm/baz@1.0.0/node_modules/baz -> /node_modules/baz

// @filename: /src/index.ts
import { useBar } from "bar";
import { useBaz } from "baz";

const barResult = useBar();
const bazResult = useBaz();

const x: string = myGlobal;

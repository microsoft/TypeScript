// @filename: /node_modules/foo/index.d.ts
/// <reference types="cookie-session"/>
export const foo = 1;

// @filename: /node_modules/foo/package.json
{
    "name": "foo",
    "version": "1.0.0",
    "types": "index.d.ts"
}
// @filename: /index.ts
import { foo } from 'foo';
const y = foo;

// @filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true,
    }
}
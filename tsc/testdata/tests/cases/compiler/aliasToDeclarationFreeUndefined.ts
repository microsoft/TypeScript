// @filename: target.cjs
module.exports=undefined
// @filename: bridge.mjs
import * as ns from './target.cjs'; export function read() { return ns }
// @filename: main.ts
import { read } from './bridge.mjs'; read();
// @filename: tsconfig.json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "strict": true,
        "noImplicitReturns": true,
        "noImplicitOverride": true,
        "allowUnreachableCode": false,
        "allowImportingTsExtensions": true,
        "allowJs": true,
        "maxNodeModuleJsDepth": 8,
        "types": [],
        "skipLibCheck": true,
        "noEmit": true,
        "lib": [
            "ES2022"
        ]
    },
    "files": [
        "main.ts"
    ]
}

// @filename: src/host.ts
import { report } from "mid"; export function run(): string { return report() }
// @filename: node_modules/target/package.json
{"name":"target","main":"index.cjs"}
// @filename: node_modules/target/index.cjs
module.exports=undefined
// @filename: node_modules/mid/package.json
{"name":"mid","main":"index.mjs"}
// @filename: node_modules/mid/index.mjs
import {initial,early} from './reader.mjs';import * as ns from 'target';export function read(){return ns};export function report(){return early+':'+(initial===ns)+':'+String(ns.default)+':'+Object.keys(ns).join(',')}
// @filename: node_modules/mid/reader.mjs
import{read}from './index.mjs';export var initial;export var early;try{initial=read();early=typeof initial+':'+String(initial.default)+':'+Object.keys(initial).join(',')}catch(e){early=e.name}
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
        "src/host.ts"
    ]
}

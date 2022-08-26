// @allowJs: true
// @checkJs: false
// @module: ES2020, commonjs
// @moduleResolution: node
// @outDir: out

// @Filename: caller.js
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this import is elided in transform
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // `TruffleContract` is considered 'unused'


// @Filename: node_modules/@truffle/contract/index.d.ts
declare module "@truffle/contract" {
    // import { ContractObject } from "@truffle/contract-schema";
    interface ContractObject {
        foo: number;
    }
    namespace TruffleContract {
        export type Contract = ContractObject;
    }
    export default TruffleContract;
}
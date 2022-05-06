// @allowJs: true
// @checkJs: false
// @module: ES2020
// @moduleResolution: node
// @outDir: out

// @Filename: caller.js
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this line dropped when JS is copied
// import { initContract } from './functions.js';
// initContract({}, fs, TruffleContract);
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // still 'unused'


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

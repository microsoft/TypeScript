// @allowJs: true
// @checkJs: true
// @moduleResolution: bundler
// @module: ES2020
// @outDir: out

// @Filename: caller.js
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this import is elided in transform
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // `TruffleContract` is considered 'unused'


// @Filename: node_modules/@truffle/contract/index.d.ts
declare module "@truffle/contract" {
    interface ContractObject {
        foo: number;
    }
    namespace TruffleContract {
        export type Contract = ContractObject;
    }
    export default TruffleContract;
}
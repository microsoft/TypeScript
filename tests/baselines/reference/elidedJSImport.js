//// [tests/cases/compiler/elidedJSImport.ts] ////

//// [caller.js]
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this import is elided in transform
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // `TruffleContract` is considered 'unused'


//// [index.d.ts]
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

//// [caller.js]
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this import is elided in transform
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // `TruffleContract` is considered 'unused'

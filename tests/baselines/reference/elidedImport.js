//// [tests/cases/compiler/elidedImport.ts] ////

//// [caller.js]
import * as fs from 'fs';
import TruffleContract from '@truffle/contract'; // Runtime err: this line dropped when JS is copied
// import { initContract } from './functions.js';
// initContract({}, fs, TruffleContract);
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // still 'unused'


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
// import { initContract } from './functions.js';
// initContract({}, fs, TruffleContract);
console.log(fs);
console.log('TruffleContract is ', typeof TruffleContract, TruffleContract); // still 'unused'

// ==ORIGINAL==

import { A, B, Dictionary} from './someTypes';

function doThing(): void {
    const aBunchOfA: Dictionary<B> = {};
    
    /*[#|*/aBunchOfA['key'] = { a: 'thing' };/*|]*/
}
// ==SCOPE::Extract to inner function in function 'doThing'==

import { A, B, Dictionary} from './someTypes';

function doThing(): void {
    const aBunchOfA: Dictionary<B> = {};
    
    /*RENAME*/newFunction();

    function newFunction() {
        aBunchOfA['key'] = { a: 'thing' };
    }
}
// ==SCOPE::Extract to function in module scope==

import { A, B, Dictionary} from './someTypes';

function doThing(): void {
    const aBunchOfA: Dictionary<B> = {};
    
    /*RENAME*/newFunction(aBunchOfA);
}

function newFunction(aBunchOfA: Dictionary<Dictionary<A>>) {
    aBunchOfA['key'] = { a: 'thing' };
}

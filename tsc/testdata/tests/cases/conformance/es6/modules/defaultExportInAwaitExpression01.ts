// @target: ES6
// @module: umd
// @filename: a.ts
const x = new Promise( ( resolve, reject ) => { resolve( {} ); } );
export default x;

// @filename: b.ts
import x from './a';

( async function() {
    const value = await x;
}() );

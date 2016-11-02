//// [partialType4.ts]

interface State1 {
    name: string;
    length: number;
    [key: string]: string | number;
}

const subs: partial State1 = {};
subs['foo'] = 32;
subs['bar'] = 'ok';
subs['ok'] = undefined;
subs.name = undefined; // ok
subs.name = false; // not ok
// Errors
subs['err'] = false;
subs[12] = false;


//// [partialType4.js]
var subs = {};
subs['foo'] = 32;
subs['bar'] = 'ok';
subs['ok'] = undefined;
subs.name = undefined; // ok
subs.name = false; // not ok
// Errors
subs['err'] = false;
subs[12] = false;
<<<<<<< 5a0ba57342ea1e785cf69aa91a93fa378c2c53ab
<<<<<<< d147616ccc57b7c9f6418074c8edffd3ee258961
=======
>>>>>>> Forgot baseline


//// [partialType4.d.ts]
interface State1 {
    name: string;
    length: number;
    [key: string]: string | number;
}
declare const subs: partial State1;
<<<<<<< 5a0ba57342ea1e785cf69aa91a93fa378c2c53ab
=======
>>>>>>> Partial Types (#11233)
=======
>>>>>>> Forgot baseline

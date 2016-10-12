// @strictNullChecks: true
<<<<<<< 4c6bf657250405beb9bb7edaf3bd10d3db165690
<<<<<<< d147616ccc57b7c9f6418074c8edffd3ee258961
// @declaration: true
=======
>>>>>>> Partial Types (#11233)
=======
// @declaration: true
>>>>>>> Update test for --d

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

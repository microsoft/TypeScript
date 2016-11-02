//// [subsetType3.ts]
interface State {
    name: string;
    length: number;
    [key: string]: string | number;
}

const subs: partial State = {};
subs['foo'] = 32;
subs['bar'] = 'ok';
// Errors
subs['err'] = false;
subs[12] = false;





//// [subsetType3.js]
var subs = {};
subs['foo'] = 32;
subs['bar'] = 'ok';
// Errors
subs['err'] = false;
subs[12] = false;

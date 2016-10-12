// @strictNullChecks: true

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

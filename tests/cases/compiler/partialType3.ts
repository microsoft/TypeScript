interface State1 {
    name: string;
    length: number;
    [key: string]: string | number;
}

const subs: partial State1 = {};
subs['foo'] = 32;
subs['bar'] = 'ok';
// Errors
subs['err'] = false;
subs[12] = false;

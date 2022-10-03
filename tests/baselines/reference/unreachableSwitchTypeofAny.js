//// [unreachable.ts]
const unreachable = (x: any): number => {
    switch (typeof x) {
        case 'string': return 0
        case 'number': return 0
        case 'bigint': return 0
        case 'boolean': return 0
        case 'symbol': return 0
        case 'undefined': return 0
        case 'object': return 0
        case 'function': return 0
    }
    x;
}

//// [unreachable.js]
var unreachable = function (x) {
    switch (typeof x) {
        case 'string': return 0;
        case 'number': return 0;
        case 'bigint': return 0;
        case 'boolean': return 0;
        case 'symbol': return 0;
        case 'undefined': return 0;
        case 'object': return 0;
        case 'function': return 0;
    }
    x;
};

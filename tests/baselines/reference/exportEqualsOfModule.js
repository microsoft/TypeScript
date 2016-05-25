//// [exportEqualsOfModule.ts]
declare module '~popsicle/dist/request' {
    export class Request {}
}

declare module '~popsicle/dist/common' {
    import { Request } from '~popsicle/dist/request';
    export { Request };
}

declare module 'popsicle' {
    import alias = require('~popsicle/dist/common');
    export = alias;
}

declare module 'popsicle-proxy-agent' {
    import { Request } from 'popsicle';
    function proxy(): (request: Request) => any;
    export = proxy;
}


//// [exportEqualsOfModule.js]

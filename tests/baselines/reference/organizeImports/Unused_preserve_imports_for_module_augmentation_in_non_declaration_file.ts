// ==ORIGINAL==

import foo from 'foo';
import { Caseless } from 'caseless';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}
// ==ORGANIZED==

import { Caseless } from 'caseless';
import foo from 'foo';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}
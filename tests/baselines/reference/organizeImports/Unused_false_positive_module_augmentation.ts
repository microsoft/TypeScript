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

import 'caseless';
import 'foo';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}
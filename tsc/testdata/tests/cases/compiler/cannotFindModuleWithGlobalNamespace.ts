// @Filename: globals.d.ts
declare module messageformat {
    export type Msg = (params: {}) => string;
}

// @Filename: main.ts
import MessageFormat from "messageformat";
import { something } from "not-declared-globally";

// @declaration: true
// @filename: file.ts

// @ts-nocheck: additional comments

export const a = 1 + {}; // This is an error, ofc, `Operator '+' cannot be applied to types '1' and '{}'`, which will be suppressed by the `nocheck` comment

export interface Aleph {
    q: number;
}

export class Bet implements Aleph {
    q: string = "lol" // And so will this implements error
}

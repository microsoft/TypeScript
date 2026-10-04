// @target: es5
// @downlevelIteration: true,false

declare const log: (s: string) => void;

declare const arr: string[];

for (const a of arr) {
    log(a);
}
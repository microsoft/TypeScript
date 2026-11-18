// @target: es2015
// @strict: true

declare const pattern: string;
declare function consume(value: string): void;
const matches = "".match(new RegExp(pattern, "g"));
if (matches) {
    for (const match of matches) {
        consume(match);
    }
}

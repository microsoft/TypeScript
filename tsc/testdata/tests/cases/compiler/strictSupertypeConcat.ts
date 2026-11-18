// @strict: true
// @noEmit: true

declare class User {
    get initial(): string;
}
declare class Group {
    memberCount: number;
}
interface Suggestion {
    initial?: string;
}
type Many<Value> = Value | readonly Value[];

declare function concat<Value>(...values: Many<Value>[]): Value[];
declare const pending: User[];
declare const suggestions: (Group | Suggestion)[];

const items = concat(pending, suggestions);

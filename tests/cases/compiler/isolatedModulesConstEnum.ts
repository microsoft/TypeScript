// @isolatedModules: true
// @filename: /foo.d.ts
declare const enum EventName {
    FOO = 1,
    BAR = 2
}

type EventMap = {
    [EventName.FOO]: number;
    [EventName.BAR]: string;
};

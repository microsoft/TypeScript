// @isolatedModules: true
// @filename: /foo.d.ts
declare const enum EventName {
    FOO = 1,
    BAR = 2
}

type E1 = {
    [EventName.FOO]: number;
    [EventName.BAR]: string;
};

// @filename: /bar.ts
type E2 = {
    [EventName.FOO]: number;
    [EventName.BAR]: string;
};

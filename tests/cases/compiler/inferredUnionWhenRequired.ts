// @strict: true

declare function assertDefined<T>(x: T | null | undefined): T;

declare function doThing(x: string | number) : void;

declare function getThing(): string | number | undefined;

doThing(assertDefined(getThing()));

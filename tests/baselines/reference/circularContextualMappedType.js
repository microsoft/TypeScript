//// [circularContextualMappedType.ts]
type Func<T> = () => T;

type Mapped<T> = { [K in keyof T]: Func<T[K]> };

declare function reproduce(options: number): void;
declare function reproduce<T>(options: Mapped<T>): T

reproduce({
  name:   () => { return 123 }
});

reproduce({
  name() { return 123 }
});

reproduce({
  name: function () { return 123 }
});


//// [circularContextualMappedType.js]
"use strict";
reproduce({
    name: function () { return 123; }
});
reproduce({
    name: function () { return 123; }
});
reproduce({
    name: function () { return 123; }
});

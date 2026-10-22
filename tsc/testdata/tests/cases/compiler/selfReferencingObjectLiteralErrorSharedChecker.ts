// @strict: true
// @noEmit: true
// @target: esnext
// @module: esnext
// @moduleResolution: bundler
// @checkers: 1

// The property chain in the arrow function reads the object literal it is
// part of. The missing property is an error in both files, also when one
// checker checks both, and b.ts's use of the literal comes after the literal
// was typed while checking a.ts (65483).

// @filename: a.ts
import type { T } from "./b";

export const Obj = {
    Updaters: {
        Template: {
            commitError: (v: T) => Obj.Updaters.Core.commitError(v),
        },
    },
};

// @filename: b.ts
import { Obj } from "./a";

export type T = number;
export const x = Obj.Updaters.Core.simpleModal;

// @strict: true
// @noEmit: true

type F =
    | readonly [0, readonly [number]]
    | readonly [0 | 1, readonly [number, number]]
    | readonly [1, readonly [number, number, number]];

const f = ([i, x]: F): undefined => {
    switch (i) {
        case 0: {
            switch (x.length) {
                case 1: case 2: return undefined;
            }
        }
        case 1: {
            const _: 2 | 3 = x.length;
        }
    }
};

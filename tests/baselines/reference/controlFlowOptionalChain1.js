//// [controlFlowOptionalChain1.ts]
type Shape =
    | { type: 'rectangle', width: number, height: number }
    | { type: 'circle', radius: number }

declare function assertUndefined(v: undefined): void

function getArea(shape?: Shape) {
    switch (shape?.type) {
        case 'circle':
            return Math.PI * shape.radius ** 2
        case 'rectangle':
            return shape.width * shape.height
        default:
            return assertUndefined(shape)
    }
}


//// [controlFlowOptionalChain1.js]
"use strict";
function getArea(shape) {
    var _a;
    switch ((_a = shape) === null || _a === void 0 ? void 0 : _a.type) {
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
        case 'rectangle':
            return shape.width * shape.height;
        default:
            return assertUndefined(shape);
    }
}

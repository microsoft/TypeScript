//// [narrowingByNonLiteralIndexedAccess.ts]
interface IEye {
    visibility: number | undefined
}

interface IPirate {
    hands: number | undefined,
    eyes: IEye[]
}

const pirates: IPirate[] = [];

const index: number = 1;

pirates[index].hands++;
if (pirates[index].hands) pirates[index].hands++;

pirates[index].eyes[index].visibility++;
if (pirates[index].eyes[index].visibility) pirates[index].eyes[index].visibility++;


//// [narrowingByNonLiteralIndexedAccess.js]
"use strict";
var pirates = [];
var index = 1;
pirates[index].hands++;
if (pirates[index].hands)
    pirates[index].hands++;
pirates[index].eyes[index].visibility++;
if (pirates[index].eyes[index].visibility)
    pirates[index].eyes[index].visibility++;

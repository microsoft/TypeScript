//// [errorForObjectLiteralAgainstTypeWithIndexer01.ts]
type PlainObjectItem = string | number | boolean | null

interface PlainObject {
    [key: string]: PlainObjectItem | PlainObjectItem[] | PlainObject
}

const hoge: PlainObject = {
    key1: 'hoge',
    key2: {
        key21: 'aaa',
        key22: false,
        key23: {
            key231: [1,2,3,4,5],
            date: new Date()
        }
    }
}


//// [errorForObjectLiteralAgainstTypeWithIndexer01.js]
"use strict";
var hoge = {
    key1: 'hoge',
    key2: {
        key21: 'aaa',
        key22: false,
        key23: {
            key231: [1, 2, 3, 4, 5],
            date: new Date()
        }
    }
};

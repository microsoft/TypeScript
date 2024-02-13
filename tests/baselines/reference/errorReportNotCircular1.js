//// [tests/cases/compiler/errorReportNotCircular1.ts] ////

//// [data.ts]
// https://github.com/microsoft/TypeScript/issues/57357

import type { Data } from "./processor";

export function getData() {
  return constructData({}) satisfies []; // error
}

function constructData(data: Data) {
  const { ...props } = data;
  return {
    ...props,
  };
}

//// [type.ts]
export type Value = {};

//// [processor.ts]
import { getData } from "./data";

import type { Value } from "./type";

export type Data = {
  quantity: Value;
};

declare function createRequestProcessor<Req>(pipeline: () => Req): Req;

export const processor = createRequestProcessor(getData);

//// [main.ts]
import { processor } from "./processor";
export default processor;

//// [workerinterface.ts]
import type Server from "./main";

export type _T = typeof Server;


//// [type.js]
export {};
//// [processor.js]
import { getData } from "./data";
export const processor = createRequestProcessor(getData);
//// [data.js]
// https://github.com/microsoft/TypeScript/issues/57357
export function getData() {
    return constructData({}); // error
}
function constructData(data) {
    const { ...props } = data;
    return {
        ...props,
    };
}
//// [main.js]
import { processor } from "./processor";
export default processor;
//// [workerinterface.js]
export {};

// @strict: true
// @target: esnext

// https://github.com/microsoft/TypeScript/issues/57357

// @filename: data.ts
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

// @filename: type.ts
export type Value = {};

// @filename: processor.ts
import { getData } from "./data";

import type { Value } from "./type";

export type Data = {
  quantity: Value;
};

declare function createRequestProcessor<Req>(pipeline: () => Req): Req;

export const processor = createRequestProcessor(getData);

// @filename: main.ts
import { processor } from "./processor";
export default processor;

// @filename: workerinterface.ts
import type Server from "./main";

export type _T = typeof Server;

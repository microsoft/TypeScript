// @declaration: true
// @outDir: /packages/search-prefix/lib
// @rootDir: /packages/search-prefix/src
// @target: es5
// @filename: /packages/search/package.json
{
    "name": "search",
    "version": "0.0.1",
    "main": "lib/index.js",
    "types": "lib/index.d.ts",
    "sideEffects": false
}
// @filename: /packages/search/lib/index.d.ts
export declare function test<T> (a: () => T): () => T;
// @filename: /packages/search-prefix/src/API/NotificationAPIUtils.ts
export type NotificationRequest = {};
export type NotificationResponse = {};
export function getNotification(): NotificationResponse {
  return {};
}
// @filename: /packages/search-prefix/src/Store/NotificationStore.ts
import { test } from "search/lib/index";
import { getNotification } from "../API/NotificationAPIUtils";

export const NotificationScenario = test(
  getNotification
);
// @link: /packages/search -> /node_modules/search
// @link: /packages/search-prefix -> /node_modules/search-prefix
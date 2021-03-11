//// [tests/cases/compiler/declarationEmitSymlinkPaths.ts] ////

//// [package.json]
{
    "name": "search",
    "version": "0.0.1",
    "main": "lib/index.js",
    "types": "lib/index.d.ts",
    "sideEffects": false
}
//// [index.d.ts]
export declare function test<T> (a: () => T): () => T;
//// [NotificationAPIUtils.ts]
export type NotificationRequest = {};
export type NotificationResponse = {};
export function getNotification(): NotificationResponse {
  return {};
}
//// [NotificationStore.ts]
import { test } from "search/lib/index";
import { getNotification } from "../API/NotificationAPIUtils";

export const NotificationScenario = test(
  getNotification
);

//// [NotificationAPIUtils.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotification = void 0;
function getNotification() {
    return {};
}
exports.getNotification = getNotification;
//// [NotificationStore.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationScenario = void 0;
var index_1 = require("search/lib/index");
var NotificationAPIUtils_1 = require("../API/NotificationAPIUtils");
exports.NotificationScenario = (0, index_1.test)(NotificationAPIUtils_1.getNotification);


//// [NotificationAPIUtils.d.ts]
export declare type NotificationRequest = {};
export declare type NotificationResponse = {};
export declare function getNotification(): NotificationResponse;
//// [NotificationStore.d.ts]
export declare const NotificationScenario: () => import("../API/NotificationAPIUtils").NotificationResponse;

//// [tests/cases/compiler/nodeModuleReexportFromDottedPath.ts] ////

//// [index.d.ts]
export interface PrismaClientOptions {
  rejectOnNotFound?: any;
}

export class PrismaClient<T extends PrismaClientOptions = PrismaClientOptions> {
  private fetcher;
}

//// [index.d.ts]
export * from ".prisma/client";

//// [index.ts]
import { PrismaClient } from "@prisma/client";
declare const enhancePrisma: <TPrismaClientCtor>(client: TPrismaClientCtor) => TPrismaClientCtor & { enhanced: unknown };
const EnhancedPrisma = enhancePrisma(PrismaClient);
export default new EnhancedPrisma();


//// [index.js]
"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var EnhancedPrisma = enhancePrisma(client_1.PrismaClient);
exports["default"] = new EnhancedPrisma();


//// [index.d.ts]
import { PrismaClient } from "@prisma/client";
declare const _default: PrismaClient<import(".prisma/client").PrismaClientOptions>;
export default _default;

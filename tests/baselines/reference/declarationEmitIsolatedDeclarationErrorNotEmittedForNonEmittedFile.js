//// [tests/cases/compiler/declarationEmitIsolatedDeclarationErrorNotEmittedForNonEmittedFile.ts] ////

//// [config.d.ts]
export interface RootConfig<T> {
    prop: T;
}
//// [utils.d.ts]
export interface ErrorFormatterShape<T={}> {
    prop: T;
}
export type PickFirstDefined<TType, TPick> = undefined extends TType
  ? undefined extends TPick
    ? never
    : TPick
  : TType;
export interface ErrorFormatter<T={},U={}> {
    prop: [T, U];
}
export interface DefaultErrorShape<T={}> {
    prop: T;
}
//// [middleware.d.ts]
export interface MiddlewareFunction<T={},U={}> {
    prop: [T, U];
}
export interface MiddlewareBuilder<T={},U={}> {
    prop: [T, U];
}
//// [index.d.ts]
import { RootConfig } from './internals/config';
import { ErrorFormatterShape, PickFirstDefined, ErrorFormatter, DefaultErrorShape } from './internals/utils';
declare class TRPCBuilder<TParams> {
    create<TOptions extends Record<string, any>>(): {
        procedure: {};
        middleware: <TNewParams extends Record<string, any>>(fn: import("./middleware").MiddlewareFunction<{
            _config: RootConfig<{
                errorShape: ErrorFormatterShape<PickFirstDefined<TOptions["errorFormatter"], ErrorFormatter<TParams["ctx"] extends object ? TParams["ctx"] : object, DefaultErrorShape>>>;
            }>;
        }, TNewParams>) => import("./middleware").MiddlewareBuilder<{
            _config: RootConfig<{
                errorShape: ErrorFormatterShape<PickFirstDefined<TOptions["errorFormatter"], ErrorFormatter<TParams["ctx"] extends object ? TParams["ctx"] : object, DefaultErrorShape>>>;
            }>;
        }, TNewParams>;
        router: {};
    };
} 

export declare const initTRPC: TRPCBuilder<object>;
export {};
//// [index.ts]
import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.router = exports.middleware = void 0;
var server_1 = require("@trpc/server");
var trpc = server_1.initTRPC.create();
exports.middleware = trpc.middleware;
exports.router = trpc.router;
exports.publicProcedure = trpc.procedure;

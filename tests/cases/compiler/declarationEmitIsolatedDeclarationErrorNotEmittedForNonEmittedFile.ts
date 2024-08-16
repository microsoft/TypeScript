// @declaration: true
// @isolatedDeclarations: true
// @filename: node_modules/@trpc/server/internals/config.d.ts
export interface RootConfig<T> {
    prop: T;
}
// @filename: node_modules/@trpc/server/internals/utils.d.ts
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
// @filename: node_modules/@trpc/server/middleware.d.ts
export interface MiddlewareFunction<T={},U={}> {
    prop: [T, U];
}
export interface MiddlewareBuilder<T={},U={}> {
    prop: [T, U];
}
// @filename: node_modules/@trpc/server/index.d.ts
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
// @filename: index.ts
import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
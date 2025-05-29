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
const server_1 = require("@trpc/server");
const trpc = server_1.initTRPC.create();
exports.middleware = trpc.middleware;
exports.router = trpc.router;
exports.publicProcedure = trpc.procedure;


//// [index.d.ts]
export declare const middleware: <TNewParams extends Record<string, any>>(fn: import("@trpc/server").MiddlewareFunction<{
    _config: import("@trpc/server").RootConfig<{
        errorShape: import("@trpc/server").ErrorFormatterShape<never>;
    }>;
}, TNewParams>) => import("@trpc/server").MiddlewareBuilder<{
    _config: import("@trpc/server").RootConfig<{
        errorShape: import("@trpc/server").ErrorFormatterShape<never>;
    }>;
}, TNewParams>;
export declare const router: {};
export declare const publicProcedure: {};


//// [DtsFileErrors]


index.d.ts(1,102): error TS2694: Namespace '"node_modules/@trpc/server/index"' has no exported member 'MiddlewareFunction'.
index.d.ts(5,43): error TS2694: Namespace '"node_modules/@trpc/server/index"' has no exported member 'MiddlewareBuilder'.


==== node_modules/@trpc/server/internals/config.d.ts (0 errors) ====
    export interface RootConfig<T> {
        prop: T;
    }
==== node_modules/@trpc/server/internals/utils.d.ts (0 errors) ====
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
==== node_modules/@trpc/server/middleware.d.ts (0 errors) ====
    export interface MiddlewareFunction<T={},U={}> {
        prop: [T, U];
    }
    export interface MiddlewareBuilder<T={},U={}> {
        prop: [T, U];
    }
==== node_modules/@trpc/server/index.d.ts (0 errors) ====
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
==== index.d.ts (2 errors) ====
    export declare const middleware: <TNewParams extends Record<string, any>>(fn: import("@trpc/server").MiddlewareFunction<{
                                                                                                         ~~~~~~~~~~~~~~~~~~
!!! error TS2694: Namespace '"node_modules/@trpc/server/index"' has no exported member 'MiddlewareFunction'.
        _config: import("@trpc/server").RootConfig<{
            errorShape: import("@trpc/server").ErrorFormatterShape<never>;
        }>;
    }, TNewParams>) => import("@trpc/server").MiddlewareBuilder<{
                                              ~~~~~~~~~~~~~~~~~
!!! error TS2694: Namespace '"node_modules/@trpc/server/index"' has no exported member 'MiddlewareBuilder'.
        _config: import("@trpc/server").RootConfig<{
            errorShape: import("@trpc/server").ErrorFormatterShape<never>;
        }>;
    }, TNewParams>;
    export declare const router: {};
    export declare const publicProcedure: {};
    
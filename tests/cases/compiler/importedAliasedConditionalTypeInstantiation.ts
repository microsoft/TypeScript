// @filename: node_modules/aws-lambda/index.d.ts
export type Handler<TEvent = any, TResult = any> = (
    event: TEvent,
    context: {},
    callback: Callback<TResult>,
) => void | Promise<TResult>;

export type Callback<TResult = any> = (error?: Error | string | null, result?: TResult) => void;

// @filename: node_modules/lambda-tester/index.d.ts
import { Handler, Callback } from 'aws-lambda';
declare namespace lambdaTester {
    type HandlerEvent<T extends Handler> = T extends Handler<infer TEvent> ? TEvent : never;
    type HandlerResult<T extends Handler> = T extends Handler<any, infer TResult> ? TResult : never;
    type HandlerError<T extends Handler> = T extends Handler<any, infer TResult>
        ? NonNullable<Parameters<Callback<TResult>>['0']>
        : never;

    interface VerifierFn<S> {
        (result: S, additional?: any): void | Promise<void>;
        (result: S, additional?: any, done?: () => {}): void;
    }
    type Verifier<S> = S extends HandlerError<Handler>
        ? S extends string
            ? VerifierFn<string>
            : S extends Error
            ? VerifierFn<Error>
            : never
        : VerifierFn<S>;

    class LambdaTester<T extends Handler> {
        event(event: HandlerEvent<T>): this;
    }
}

declare function lambdaTester<T extends Handler>(handler: T): lambdaTester.LambdaTester<T>;

export = lambdaTester;
// @filename: index.ts

import * as lambdaTester from 'lambda-tester';
import { Handler } from 'aws-lambda';

type Actual = lambdaTester.Verifier<lambdaTester.HandlerResult<Handler>>;
type Expected = lambdaTester.Verifier<lambdaTester.HandlerResult<Handler<any, any>>>;
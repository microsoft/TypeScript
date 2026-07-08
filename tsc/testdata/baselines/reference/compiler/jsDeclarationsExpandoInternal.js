//// [tests/cases/compiler/jsDeclarationsExpandoInternal.tsx] ////

//// [main.jsx]
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';

/**
 * @param {Object} args
 * @param {string} args.text
 */
function Internal(args) {
    return <div>{args.text}</div>
}
Internal.args = { text: 'text' };

export const PublicInternalBinding = Internal.bind({});
PublicInternalBinding.args = { text: 'bind text' };

/**
 * @param {Object} args
 * @param {string} args.text
 */
export function Exported(args) {
    return <div>{args.text}</div>
}
Exported.args = { text: 'text' };

export const PublicExportedBinding = Exported.bind({});
PublicExportedBinding.args = { text: 'bind text' };



//// [main.d.ts]
/**
 * @param {Object} args
 * @param {string} args.text
 */
declare function Internal(args: {
    text: string;
}): JSX.Element;
declare namespace Internal {
    var args: {
        text: string;
    };
}
export declare const PublicInternalBinding: typeof Internal;
/**
 * @param {Object} args
 * @param {string} args.text
 */
export declare function Exported(args: {
    text: string;
}): JSX.Element;
export declare namespace Exported {
    var args: {
        text: string;
    };
}
export declare const PublicExportedBinding: typeof Exported;
export {};


//// [DtsFileErrors]


src/main.d.ts(7,5): error TS2503: Cannot find namespace 'JSX'.
src/main.d.ts(20,5): error TS2503: Cannot find namespace 'JSX'.


==== src/main.d.ts (2 errors) ====
    /**
     * @param {Object} args
     * @param {string} args.text
     */
    declare function Internal(args: {
        text: string;
    }): JSX.Element;
        ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    declare namespace Internal {
        var args: {
            text: string;
        };
    }
    export declare const PublicInternalBinding: typeof Internal;
    /**
     * @param {Object} args
     * @param {string} args.text
     */
    export declare function Exported(args: {
        text: string;
    }): JSX.Element;
        ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    export declare namespace Exported {
        var args: {
            text: string;
        };
    }
    export declare const PublicExportedBinding: typeof Exported;
    export {};
    
//// [tests/cases/compiler/declarationEmitUsingAliasSymbolChain2.ts] ////

//// [index.d.ts]
import * as DefaultExport from "./internal/default_exports";
export { DefaultExport as default };
export * as BaseWindow from "./internal/windows/basewindow";

//// [default_exports.d.ts]
export { default as BaseWindow } from "./windows/basewindow";

//// [basewindow.d.ts]
interface BaseWindow {}
export interface BaseWindowConstructor {}
declare const BaseWindow: BaseWindowConstructor;
export default BaseWindow;


//// [widget-config.d.ts]
import type UI from "../../lib/index";
export interface WidgetFactory {
    instantiator(parentWindow: UI.BaseWindow): void;
}

//// [widget-factory.ts]
import {WidgetFactory} from "../../lib-utils/shared-types/widget-config";

declare const instantiator: WidgetFactory['instantiator'];

export default Object.freeze({
    instantiator
});

import type * as __synthetic_export_lib_1 from "../../lib/index";


//// [widget-factory.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Object.freeze({
    instantiator: instantiator
});


//// [widget-factory.d.ts]
declare const _default: Readonly<{
    instantiator: (parentWindow: __synthetic_export_lib_1.default.BaseWindow) => void;
}>;
export default _default;
import type * as __synthetic_export_lib_1 from "../../lib/index";

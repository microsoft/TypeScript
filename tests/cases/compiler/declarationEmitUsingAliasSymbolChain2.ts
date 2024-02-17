// @strict: true
// @declaration: true

// @filename: lib/index.d.ts
import * as DefaultExport from "./internal/default_exports";
export { DefaultExport as default };
export * as BaseWindow from "./internal/windows/basewindow";

// @filename: lib/internal/default_exports.d.ts
export { default as BaseWindow } from "./windows/basewindow";

// @filename: lib/internal/windows/basewindow.d.ts
interface BaseWindow {}
export interface BaseWindowConstructor {}
declare const BaseWindow: BaseWindowConstructor;
export default BaseWindow;


// @filename: lib-utils/shared-types/widget-config.d.ts
import type UI from "../../lib/index";
export interface WidgetFactory {
    instantiator(parentWindow: UI.BaseWindow): void;
}

// @filename: app/navigator/widget-factory.ts
import {WidgetFactory} from "../../lib-utils/shared-types/widget-config";

declare const instantiator: WidgetFactory['instantiator'];

export default Object.freeze({
    instantiator
});

import type * as __synthetic_export_lib_1 from "../../lib/index";

//// [tests/cases/compiler/emitReactJsxSelfClosingElement.tsx] ////

//// [a.tsx]
const app = <App />;


//// [a.js]
import { jsx as _jsx } from "react/jsx-runtime";
const app = _jsx(App, {});

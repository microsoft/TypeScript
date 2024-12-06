//// [tests/cases/compiler/jsxFragmentFactoryReference.tsx] ////

//// [jsxFragmentFactoryReference.tsx]
export class LoggedOut {
    content = () => (
        <></>
    )
}


//// [jsxFragmentFactoryReference.js]
import { Fragment as _Fragment, jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "jsxFragmentFactoryReference.tsx";
export class LoggedOut {
    constructor() {
        this.content = () => (_jsxDEV(_Fragment, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 22 }, this));
    }
}

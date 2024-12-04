//// [tests/cases/compiler/jsxFragmentFactoryReference.tsx] ////

//// [jsxFragmentFactoryReference.tsx]
export class LoggedOut {
    content = () => (
        <>        </>
    )
}


//// [jsxFragmentFactoryReference.js]
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export class LoggedOut {
    constructor() {
        this.content = () => (_jsx(_Fragment, { children: "        " }));
    }
}

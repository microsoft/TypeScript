//// [tests/cases/compiler/jsxFragmentFactoryReference.tsx] ////

//// [jsxFragmentFactoryReference.tsx]
export class LoggedOut {
    content = () => (
        <></>
    )
}


//// [jsxFragmentFactoryReference.js]
export class LoggedOut {
    constructor() {
        this.content = () => (<></>);
    }
}

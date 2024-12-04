//// [tests/cases/compiler/jsxFragmentFactoryReference.tsx] ////

//// [jsxFragmentFactoryReference.tsx]
export class LoggedOut {
    content = () => (
        <>        </>
    )
}


//// [jsxFragmentFactoryReference.jsx]
export class LoggedOut {
    constructor() {
        this.content = () => (<>        </>);
    }
}

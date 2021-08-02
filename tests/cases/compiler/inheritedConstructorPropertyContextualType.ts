interface State {
    version: 2
}
declare class Base<S> {
    state: S
}
class Assignment extends Base<State> {
    constructor() {
        super()
        this.state = { version: 2 }
    }
}
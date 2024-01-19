// @strict: true
// @noEmit: true

interface IProps {
    one: boolean;
}

class Foo {
    mine: string = "";

    myMethod(x: IProps) {
        const { one } = x;
        switch (true) {
            case one:
                break;
            default:
                let x = this.mine;
        }
    }
}

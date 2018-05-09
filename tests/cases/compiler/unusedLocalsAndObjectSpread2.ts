//@noUnusedLocals:true

declare let props: any;
const {
    children, // here!
    active: _a, // here!
  ...rest
} = props;

function foo() {
    const {
        children,
        active: _a,
        ...rest
    } = props;
}

export const asdf = 123;
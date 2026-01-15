//@noUnusedLocals:true
//@noUnusedParameters:true

// unused
type handler1 = () => void;


function foo() {
    type handler2 = () => void;
    foo();
}

export {}
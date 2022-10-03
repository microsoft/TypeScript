// @jsx: preserve
declare namespace JSX {
    interface IntrinsicElements {
        'this:b': any;
        'b:c': {
            x: any
        };
        'a:b': any;
    }
}

<a:b></a:b>;
<b:c.x></b:c.x>;
<this:b></this:b>;
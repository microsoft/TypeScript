//// [tests/cases/conformance/jsx/checkJsxNamespaceNamesQuestionableForms.tsx] ////

//// [checkJsxNamespaceNamesQuestionableForms.tsx]
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

//// [checkJsxNamespaceNamesQuestionableForms.jsx]
<a:b></a:b>;
<b:c x></b:c>;
x > ;
<this:b></this:b>;

//// [tests/cases/compiler/jsxDeclarationsWithEsModuleInteropNoCrash.tsx] ////

//// [jsxDeclarationsWithEsModuleInteropNoCrash.jsx]
/// <reference path="/.lib/react16.d.ts" />
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  bar: PropTypes.bool,
};

const defaultProps = {
  bar: false,
};

function Foo({ bar }) {
  return <div>{bar}</div>;
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;



//// [jsxDeclarationsWithEsModuleInteropNoCrash.d.ts]
export default Foo;
declare function Foo({ bar }: {
    bar: any;
}): JSX.Element;
declare namespace Foo {
    export { propTypes };
    export { defaultProps };
}
declare namespace propTypes {
    let bar: PropTypes.Requireable<boolean>;
}
declare namespace defaultProps {
    let bar_1: boolean;
    export { bar_1 as bar };
}
import PropTypes from 'prop-types';


//// [DtsFileErrors]


jsxDeclarationsWithEsModuleInteropNoCrash.d.ts(4,5): error TS2503: Cannot find namespace 'JSX'.
jsxDeclarationsWithEsModuleInteropNoCrash.d.ts(16,23): error TS2307: Cannot find module 'prop-types' or its corresponding type declarations.


==== jsxDeclarationsWithEsModuleInteropNoCrash.d.ts (2 errors) ====
    export default Foo;
    declare function Foo({ bar }: {
        bar: any;
    }): JSX.Element;
        ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    declare namespace Foo {
        export { propTypes };
        export { defaultProps };
    }
    declare namespace propTypes {
        let bar: PropTypes.Requireable<boolean>;
    }
    declare namespace defaultProps {
        let bar_1: boolean;
        export { bar_1 as bar };
    }
    import PropTypes from 'prop-types';
                          ~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'prop-types' or its corresponding type declarations.
    
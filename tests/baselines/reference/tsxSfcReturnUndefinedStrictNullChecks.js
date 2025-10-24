//// [tests/cases/conformance/jsx/tsxSfcReturnUndefinedStrictNullChecks.tsx] ////

//// [file.tsx]
import React = require('react');

const Foo = (props: any) => undefined;
function Greet(x: {name?: string}) {
	return undefined;
}

// Error
const foo = <Foo />;
const G = <Greet />;

//// [file.jsx]
<<<<<<< HEAD
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Foo = (props) => undefined;
    function Greet(x) {
        return undefined;
    }
    // Error
    const foo = <Foo />;
    const G = <Greet />;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Foo = function (props) { return undefined; };
    function Greet(x) {
        return undefined;
    }
    // Error
    var foo = <Foo />;
    var G = <Greet />;
});
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Foo = function (props) { return undefined; };
function Greet(x) {
    return undefined;
}
// Error
var foo = <Foo />;
var G = <Greet />;
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [file.tsx]
import React = require('react');

export function makeP<P>(Ctor: React.ComponentClass<P>) {
	return class extends React.PureComponent<P, void> {
		public render(): JSX.Element {
			return (
				<Ctor {...this.props } />
			);
		}
	};
}



//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
function makeP(Ctor) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return (<Ctor {...this.props}/>);
        };
        return class_1;
    }(React.PureComponent));
}
exports.makeP = makeP;

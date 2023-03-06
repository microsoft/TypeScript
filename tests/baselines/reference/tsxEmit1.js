//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

var p;
var selfClosed1 = <div />;
var selfClosed2 = <div x="1" />;
var selfClosed3 = <div x='1' />;
var selfClosed4 = <div x="1" y='0' />;
var selfClosed5 = <div x={0} y='0' />;
var selfClosed6 = <div x={"1"} y='0' />;
var selfClosed7 = <div x={p} y='p' />;

var openClosed1 = <div></div>;
var openClosed2 = <div n='m'>foo</div>;
var openClosed3 = <div n='m'>{p}</div>;
var openClosed4 = <div n='m'>{p < p}</div>;
var openClosed5 = <div n='m'>{p > p}</div>;

class SomeClass {
	f() {
		var rewrites1 = <div>{() => this}</div>;
		var rewrites2 = <div>{[p, ...p, p]}</div>;
		var rewrites3 = <div>{{p}}</div>;

		var rewrites4 = <div a={() => this}></div>;
		var rewrites5 = <div a={[p, ...p, p]}></div>;
		var rewrites6 = <div a={{p}}></div>;
	}
}

var whitespace1 = <div>      </div>;
var whitespace2 = <div>  {p}    </div>;
var whitespace3 = <div>  
      {p}    
      </div>;


//// [file.jsx]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var p;
var selfClosed1 = <div />;
var selfClosed2 = <div x="1"/>;
var selfClosed3 = <div x='1'/>;
var selfClosed4 = <div x="1" y='0'/>;
var selfClosed5 = <div x={0} y='0'/>;
var selfClosed6 = <div x={"1"} y='0'/>;
var selfClosed7 = <div x={p} y='p'/>;
var openClosed1 = <div></div>;
var openClosed2 = <div n='m'>foo</div>;
var openClosed3 = <div n='m'>{p}</div>;
var openClosed4 = <div n='m'>{p < p}</div>;
var openClosed5 = <div n='m'>{p > p}</div>;
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.f = function () {
        var _this = this;
        var rewrites1 = <div>{function () { return _this; }}</div>;
        var rewrites2 = <div>{__spreadArray(__spreadArray([p], p, true), [p], false)}</div>;
        var rewrites3 = <div>{{ p: p }}</div>;
        var rewrites4 = <div a={function () { return _this; }}></div>;
        var rewrites5 = <div a={__spreadArray(__spreadArray([p], p, true), [p], false)}></div>;
        var rewrites6 = <div a={{ p: p }}></div>;
    };
    return SomeClass;
}());
var whitespace1 = <div>      </div>;
var whitespace2 = <div>  {p}    </div>;
var whitespace3 = <div>  
      {p}    
      </div>;

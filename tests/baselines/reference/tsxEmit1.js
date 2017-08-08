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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
var SomeClass = (function () {
    function SomeClass() {
    }
    SomeClass.prototype.f = function () {
        var _this = this;
        var rewrites1 = <div>{function () { return _this; }}</div>;
        var rewrites2 = <div>{[p].concat(p, [p])}</div>;
        var rewrites3 = <div>{{ p: p }}</div>;
        var rewrites4 = <div a={function () { return _this; }}></div>;
        var rewrites5 = <div a={[p].concat(p, [p])}></div>;
        var rewrites6 = <div a={{ p: p }}></div>;
    };
    __names(SomeClass.prototype, ["f"]);
    return SomeClass;
}());
var whitespace1 = <div>      </div>;
var whitespace2 = <div>  {p}    </div>;
var whitespace3 = <div>  
      {p}    
      </div>;

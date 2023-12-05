//// [tests/cases/compiler/arrayconcat.ts] ////

//// [arrayconcat.ts]
interface IOptions {
    name?: string;
    flag?: boolean;
    short?: string;
    usage?: string;
    set?: (s: string) => void;
    type?: string;
    experimental?: boolean;
}

class parser {
	public options: IOptions[];

	public m() {
		this.options = this.options.sort(function(a, b) {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase();

            if (aName > bName) {
                return 1;
            } else if (aName < bName) {
                return -1;
            } else {
                return 0;
            }
        });
	}
}

//// [arrayconcat.js]
var parser = /** @class */ (function () {
    function parser() {
    }
    parser.prototype.m = function () {
        this.options = this.options.sort(function (a, b) {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase();
            if (aName > bName) {
                return 1;
            }
            else if (aName < bName) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    return parser;
}());

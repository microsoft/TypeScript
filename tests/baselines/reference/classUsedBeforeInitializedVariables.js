//// [classUsedBeforeInitializedVariables.ts]
class Test {
    p1 = 0;
    p2 = this.p1;
    p3 = this.p4;
    p4 = 0;
    p5?: number;

    p6?: string;
    p7 = {
        hello: (this.p6 = "string"),
    };

    directlyAssigned: any = this.directlyAssigned;

    withinArrowFunction: any = () => this.withinArrowFunction;

    withinFunction: any = function () {
        return this.withinFunction;
    };

    withinObjectLiteral: any = {
        [this.withinObjectLiteral]: true,
    };

    withinObjectLiteralGetterName: any = {
        get [this.withinObjectLiteralGetterName]() {
            return true;
        }
    };

    withinObjectLiteralSetterName: any = {
        set [this.withinObjectLiteralSetterName](_: any) {}
    };

    withinClassDeclarationExtension: any = (class extends this.withinClassDeclarationExtension { });

    fromOptional = this.p5;

    // These error cases are ignored (not checked by control flow analysis)

    assignedByArrowFunction: any = (() => this.assignedByFunction)();

    assignedByFunction: any = (function () {
        return this.assignedByFunction;
    })();
}


//// [classUsedBeforeInitializedVariables.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Test = /** @class */ (function () {
    function Test() {
        var _a, _b, _c;
        var _this = this;
        this.p1 = 0;
        this.p2 = this.p1;
        this.p3 = this.p4;
        this.p4 = 0;
        this.p7 = {
            hello: (this.p6 = "string"),
        };
        this.directlyAssigned = this.directlyAssigned;
        this.withinArrowFunction = function () { return _this.withinArrowFunction; };
        this.withinFunction = function () {
            return this.withinFunction;
        };
        this.withinObjectLiteral = (_a = {},
            _a[this.withinObjectLiteral] = true,
            _a);
        this.withinObjectLiteralGetterName = (_b = {},
            Object.defineProperty(_b, this.withinObjectLiteralGetterName, {
                get: function () {
                    return true;
                },
                enumerable: false,
                configurable: true
            }),
            _b);
        this.withinObjectLiteralSetterName = (_c = {},
            Object.defineProperty(_c, this.withinObjectLiteralSetterName, {
                set: function (_) { },
                enumerable: false,
                configurable: true
            }),
            _c);
        this.withinClassDeclarationExtension = (/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_1;
        }(this.withinClassDeclarationExtension)));
        this.fromOptional = this.p5;
        // These error cases are ignored (not checked by control flow analysis)
        this.assignedByArrowFunction = (function () { return _this.assignedByFunction; })();
        this.assignedByFunction = (function () {
            return this.assignedByFunction;
        })();
    }
    return Test;
}());

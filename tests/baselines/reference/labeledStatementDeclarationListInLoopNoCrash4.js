//// [tests/cases/conformance/statements/labeledStatements/labeledStatementDeclarationListInLoopNoCrash4.ts] ////

//// [labeledStatementDeclarationListInLoopNoCrash4.ts]
export class ParseThemeData {
  parseButton(button: any) {
    const {type, size} = button;
    for (let item of type) {
      const fontType = item.type;
      const style = (state: string) => `color: var(--button-${fontType}-${state}-font-color)`;
      this.classFormat(`${style('active')});
    }
    for (let item of size) {
      const fontType = item.type;
      this.classFormat(
        [
          `font-size: var(--button-size-${fontType}-fontSize)`,
          `height: var foo`,
        ].join(';')
      );
    }
  }
}


//// [labeledStatementDeclarationListInLoopNoCrash4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseThemeData = void 0;
var ParseThemeData = /** @class */ (function () {
    function ParseThemeData() {
    }
    ParseThemeData.prototype.parseButton = function (button) {
        var type = button.type, size = button.size;
        var _loop_1 = function (item) {
            var fontType = item.type;
            var style = function (state) { return "color: var(--button-".concat(fontType, "-").concat(state, "-font-color)"); };
            this_1.classFormat("".concat(style('active'), ");\n    }\n    for (let item of size) {\n      const fontType = item.type;\n      this.classFormat(\n        [\n          "), font - size);
            (--button - size - $);
            {
                fontType;
            }
            -fontSize;
            ",\n          ";
            height: ;
            ",\n        ].join(';')\n      );\n    }\n  }\n}\n";
        };
        var this_1 = this, foo;
        for (var _i = 0, type_1 = type; _i < type_1.length; _i++) {
            var item = type_1[_i];
            _loop_1(item);
        }
    };
    return ParseThemeData;
}());
exports.ParseThemeData = ParseThemeData;

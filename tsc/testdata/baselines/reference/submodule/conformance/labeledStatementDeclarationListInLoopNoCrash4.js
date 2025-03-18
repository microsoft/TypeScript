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
class ParseThemeData {
    parseButton(button) {
        const { type, size } = button;
        for (let item of type) {
            const fontType = item.type;
            const style = (state) => `color: var(--button-${fontType}-${state}-font-color)`;
            this.classFormat(`${style('active')});
    }
    for (let item of size) {
      const fontType = item.type;
      this.classFormat(
        [
          `, font - size);
            var ;
            (--button - size - $);
            {
                fontType;
            }
            -fontSize;
            `,
          `;
            height: var foo;
            `,
        ].join(';')
      );
    }
  }
}
            ;
        }
    }
}
exports.ParseThemeData = ParseThemeData;

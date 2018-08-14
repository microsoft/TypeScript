/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: /a.tsx
////enum E {}
////enum F {}
////interface I { e: E }
////function f(e: E, f: F) {}
////f(/*arg0*/, /*arg1*/);
////
////const i: I = { e: /*prop*/ };
////
////function tag(arr: TemplateStringsArray, x: E) {}
////tag`${/*tag*/}`;
////
////declare function MainButton(props: { e: E }): any;
////<MainButton e={/*jsx*/} />
////<MainButton e=/*jsx2*/ />

recommended("arg0");
recommended("arg1", { enumName: "F" });
recommended("prop");
recommended("tag");
recommended("jsx");
recommended("jsx2", { insertText: "{E}" });

function recommended(markerName: string, { insertText, enumName = "E" }: { insertText?: string, enumName?: string } = {}) {
    goTo.marker(markerName);
    verify.completionListContains(enumName, `enum ${enumName}`, "", "enum", undefined, undefined , {
        isRecommended: true,
        includeInsertTextCompletions: true,
        insertText,
    });
}

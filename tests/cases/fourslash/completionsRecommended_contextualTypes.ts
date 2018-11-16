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
recommended("prop", { isNewIdentifierLocation: false });
recommended("tag");
recommended("jsx", { isNewIdentifierLocation: false });
recommended("jsx2", { isNewIdentifierLocation: false, insertText: "{E}" });

function recommended(marker: string, { insertText, isNewIdentifierLocation = true, enumName = "E" }: { insertText?: string, isNewIdentifierLocation?: boolean, enumName?: string } = {}) {
    verify.completions({
        marker,
        includes: {
            name: enumName,
            text: `enum ${enumName}`,
            kind: "enum",
            isRecommended: true,
            insertText,
        },
        isNewIdentifierLocation,
        preferences: {
            includeInsertTextCompletions: true,
        },
    });
}

/// <reference path="fourslash.ts" />

// @Filename: a.ts
//// {| "itemName": "default", "kind": "class", "parentName": "" |}export default class { }

// @Filename: b.ts
//// {| "itemName": "C", "kind": "class", "parentName": "" |}export default class C { }

// @Filename: c.ts
//// {| "itemName": "default", "kind": "function", "parentName": "" |}export default function { }

// @Filename: d.ts
//// {| "itemName": "Func", "kind": "function", "parentName": "" |}export default function Func { }

test.markers().forEach(marker => {
    goTo.file(marker.fileName);
    verify.getScriptLexicalStructureListContains(
        marker.data.itemName,
        marker.data.kind,
        marker.fileName,
        marker.data.parentName,
        marker.data.isAdditionalRange,
        marker.position);
});
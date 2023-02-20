/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: quickInfoInheritDoc6.js
////class B extends UNRESOLVED_VALUE_DEFINITELY_DOES_NOT_EXIST {
////    /**
////     * @inheritdoc
////     */
////    static /**/value() {
////        return undefined;
////    }
////}

verify.baselineQuickInfo();

/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoInheritDoc3.ts
////function getBaseClass() {
////    return class Base {
////        /**
////         * Base.prop
////         */
////        prop: string | undefined;
////    }
////}
////class SubClass extends getBaseClass() {
////    /**
////     * @inheritdoc
////     * SubClass.prop
////     */
////    /*1*/prop: string | undefined;
////}

verify.baselineQuickInfo();
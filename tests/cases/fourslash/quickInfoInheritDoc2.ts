/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoInheritDoc2.ts
////class Base<T> {
////    /**
////     * Base.prop
////     */
////    prop: T | undefined;
////}
////
////class SubClass<T> extends Base<T> {
////    /**
////     * @inheritdoc
////     * SubClass.prop
////     */
////    /*1*/prop: T | undefined;
////}

verify.baselineQuickInfo();
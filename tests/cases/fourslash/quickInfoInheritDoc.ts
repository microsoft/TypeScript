/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTags7.ts
////abstract class BaseClass {
////    /**
////     * Useful description always applicable
////     * 
////     * @returns {string} Useful description of return value always applicable.
////     */
////    public static doSomethingUseful(stuff?: any): string {
////        throw new Error('Must be implemented by subclass');
////    }
////
////    /**
////     * Applicable description always.
////     */
////    public static readonly someProperty: string = 'general value';
////}
////
////
////
////
////class SubClass extends BaseClass {
////
////    /**
////     * @inheritDoc
////     * 
////     * @param {{ tiger: string; lion: string; }} [mySpecificStuff] Description of my specific parameter.
////     */
////    public static /*1*/doSomethingUseful(mySpecificStuff?: { tiger: string; lion: string; }): string {
////        let useful = '';
////
////        // do something useful to useful
////
////        return useful;
////    }
////
////    /**
////     * @inheritDoc
////     */
////    public static readonly /*2*/someProperty: string = 'specific to this class value'
////}

verify.baselineQuickInfo();
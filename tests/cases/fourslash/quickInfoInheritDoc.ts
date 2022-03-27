/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoInheritDoc.ts
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
////     * BaseClass.func1
////     * @param {any} stuff1 BaseClass.func1.stuff1
////     * @returns {void} BaseClass.func1.returns
////     */
////    public static func1(stuff1: any): void {
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
////     * @param {any} stuff1 SubClass.func1.stuff1
////     * @returns {void} SubClass.func1.returns
////     */
////    public static /*2*/func1(stuff1: any): void {
////    }
////
////    /**
////     * text over tag
////     * @inheritDoc
////     * text after tag
////     */
////    public static readonly /*3*/someProperty: string = 'specific to this class value'
////}

verify.baselineQuickInfo();
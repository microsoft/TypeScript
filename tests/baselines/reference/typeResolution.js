//// [tests/cases/compiler/typeResolution.ts] ////

//// [typeResolution.ts]
export module TopLevelModule1 {
    export module SubModule1 {
        export module SubSubModule1 {
            export class ClassA {
                public AisIn1_1_1() {
                    // Try all qualified names of this type
                    var a1: ClassA; a1.AisIn1_1_1();
                    var a2: SubSubModule1.ClassA; a2.AisIn1_1_1();
                    var a3: SubModule1.SubSubModule1.ClassA; a3.AisIn1_1_1();
                    var a4: TopLevelModule1.SubModule1.SubSubModule1.ClassA; a4.AisIn1_1_1();
                    
                    // Two variants of qualifying a peer type
                    var b1: ClassB; b1.BisIn1_1_1();
                    var b2: TopLevelModule1.SubModule1.SubSubModule1.ClassB; b2.BisIn1_1_1();
                    
                    // Type only accessible from the root
                    var c1: TopLevelModule1.SubModule2.SubSubModule2.ClassA; c1.AisIn1_2_2();
                    
                    // Interface reference
                    var d1: InterfaceX; d1.XisIn1_1_1();
                    var d2: SubSubModule1.InterfaceX; d2.XisIn1_1_1();
                }
            }
            export class ClassB {
                public BisIn1_1_1() {
                    /** Exactly the same as above in AisIn1_1_1 **/
                    
                    // Try all qualified names of this type
                    var a1: ClassA; a1.AisIn1_1_1();
                    var a2: SubSubModule1.ClassA; a2.AisIn1_1_1();
                    var a3: SubModule1.SubSubModule1.ClassA; a3.AisIn1_1_1();
                    var a4: TopLevelModule1.SubModule1.SubSubModule1.ClassA; a4.AisIn1_1_1();
                    
                    // Two variants of qualifying a peer type
                    var b1: ClassB; b1.BisIn1_1_1();
                    var b2: TopLevelModule1.SubModule1.SubSubModule1.ClassB; b2.BisIn1_1_1();
                    
                    // Type only accessible from the root
                    var c1: TopLevelModule1.SubModule2.SubSubModule2.ClassA; c1.AisIn1_2_2();
                    var c2: TopLevelModule2.SubModule3.ClassA; c2.AisIn2_3();
                    
                    // Interface reference
                    var d1: InterfaceX; d1.XisIn1_1_1();
                    var d2: SubSubModule1.InterfaceX; d2.XisIn1_1_1();
                }
            }
            export interface InterfaceX { XisIn1_1_1(); }
            class NonExportedClassQ {
                constructor() {
                    function QQ() {
                        /* Sampling of stuff from AisIn1_1_1 */
                        var a4: TopLevelModule1.SubModule1.SubSubModule1.ClassA; a4.AisIn1_1_1();
                        var c1: TopLevelModule1.SubModule2.SubSubModule2.ClassA; c1.AisIn1_2_2();
                        var d1: InterfaceX; d1.XisIn1_1_1();
                        var c2: TopLevelModule2.SubModule3.ClassA; c2.AisIn2_3();
                    }
                }
            }
        }
        
        // Should have no effect on S1.SS1.ClassA above because it is not exported
        class ClassA {
            constructor() {
                function AA() {
                    var a2: SubSubModule1.ClassA; a2.AisIn1_1_1();
                    var a3: SubModule1.SubSubModule1.ClassA; a3.AisIn1_1_1();
                    var a4: TopLevelModule1.SubModule1.SubSubModule1.ClassA; a4.AisIn1_1_1();
                    
                    // Interface reference
                    var d2: SubSubModule1.InterfaceX; d2.XisIn1_1_1();
                }
            }
        }
    }

    export module SubModule2 {
        export module SubSubModule2 {
            // No code here since these are the mirror of the above calls
            export class ClassA { public AisIn1_2_2() { } }
            export class ClassB { public BisIn1_2_2() { } }
            export class ClassC { public CisIn1_2_2() { } }
            export interface InterfaceY { YisIn1_2_2(); }
            interface NonExportedInterfaceQ { }
        }
        
        export interface InterfaceY { YisIn1_2(); }
    }
    
    class ClassA {
        public AisIn1() { }
    }

    interface InterfaceY {
        YisIn1();
    }
    
    module NotExportedModule {
        export class ClassA { }
    }
}

module TopLevelModule2 {
    export module SubModule3 {
        export class ClassA {
            public AisIn2_3() { }
        }
    }
}



//// [typeResolution.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TopLevelModule1 = void 0;
    var TopLevelModule1;
    (function (TopLevelModule1) {
        var SubModule1;
        (function (SubModule1) {
            var SubSubModule1;
            (function (SubSubModule1) {
                var ClassA = /** @class */ (function () {
                    function ClassA() {
                    }
                    ClassA.prototype.AisIn1_1_1 = function () {
                        // Try all qualified names of this type
                        var a1;
                        a1.AisIn1_1_1();
                        var a2;
                        a2.AisIn1_1_1();
                        var a3;
                        a3.AisIn1_1_1();
                        var a4;
                        a4.AisIn1_1_1();
                        // Two variants of qualifying a peer type
                        var b1;
                        b1.BisIn1_1_1();
                        var b2;
                        b2.BisIn1_1_1();
                        // Type only accessible from the root
                        var c1;
                        c1.AisIn1_2_2();
                        // Interface reference
                        var d1;
                        d1.XisIn1_1_1();
                        var d2;
                        d2.XisIn1_1_1();
                    };
                    return ClassA;
                }());
                SubSubModule1.ClassA = ClassA;
                var ClassB = /** @class */ (function () {
                    function ClassB() {
                    }
                    ClassB.prototype.BisIn1_1_1 = function () {
                        /** Exactly the same as above in AisIn1_1_1 **/
                        // Try all qualified names of this type
                        var a1;
                        a1.AisIn1_1_1();
                        var a2;
                        a2.AisIn1_1_1();
                        var a3;
                        a3.AisIn1_1_1();
                        var a4;
                        a4.AisIn1_1_1();
                        // Two variants of qualifying a peer type
                        var b1;
                        b1.BisIn1_1_1();
                        var b2;
                        b2.BisIn1_1_1();
                        // Type only accessible from the root
                        var c1;
                        c1.AisIn1_2_2();
                        var c2;
                        c2.AisIn2_3();
                        // Interface reference
                        var d1;
                        d1.XisIn1_1_1();
                        var d2;
                        d2.XisIn1_1_1();
                    };
                    return ClassB;
                }());
                SubSubModule1.ClassB = ClassB;
                var NonExportedClassQ = /** @class */ (function () {
                    function NonExportedClassQ() {
                        function QQ() {
                            /* Sampling of stuff from AisIn1_1_1 */
                            var a4;
                            a4.AisIn1_1_1();
                            var c1;
                            c1.AisIn1_2_2();
                            var d1;
                            d1.XisIn1_1_1();
                            var c2;
                            c2.AisIn2_3();
                        }
                    }
                    return NonExportedClassQ;
                }());
            })(SubSubModule1 = SubModule1.SubSubModule1 || (SubModule1.SubSubModule1 = {}));
            // Should have no effect on S1.SS1.ClassA above because it is not exported
            var ClassA = /** @class */ (function () {
                function ClassA() {
                    function AA() {
                        var a2;
                        a2.AisIn1_1_1();
                        var a3;
                        a3.AisIn1_1_1();
                        var a4;
                        a4.AisIn1_1_1();
                        // Interface reference
                        var d2;
                        d2.XisIn1_1_1();
                    }
                }
                return ClassA;
            }());
        })(SubModule1 = TopLevelModule1.SubModule1 || (TopLevelModule1.SubModule1 = {}));
        var SubModule2;
        (function (SubModule2) {
            var SubSubModule2;
            (function (SubSubModule2) {
                // No code here since these are the mirror of the above calls
                var ClassA = /** @class */ (function () {
                    function ClassA() {
                    }
                    ClassA.prototype.AisIn1_2_2 = function () { };
                    return ClassA;
                }());
                SubSubModule2.ClassA = ClassA;
                var ClassB = /** @class */ (function () {
                    function ClassB() {
                    }
                    ClassB.prototype.BisIn1_2_2 = function () { };
                    return ClassB;
                }());
                SubSubModule2.ClassB = ClassB;
                var ClassC = /** @class */ (function () {
                    function ClassC() {
                    }
                    ClassC.prototype.CisIn1_2_2 = function () { };
                    return ClassC;
                }());
                SubSubModule2.ClassC = ClassC;
            })(SubSubModule2 = SubModule2.SubSubModule2 || (SubModule2.SubSubModule2 = {}));
        })(SubModule2 = TopLevelModule1.SubModule2 || (TopLevelModule1.SubModule2 = {}));
        var ClassA = /** @class */ (function () {
            function ClassA() {
            }
            ClassA.prototype.AisIn1 = function () { };
            return ClassA;
        }());
        var NotExportedModule;
        (function (NotExportedModule) {
            var ClassA = /** @class */ (function () {
                function ClassA() {
                }
                return ClassA;
            }());
            NotExportedModule.ClassA = ClassA;
        })(NotExportedModule || (NotExportedModule = {}));
    })(TopLevelModule1 || (exports.TopLevelModule1 = TopLevelModule1 = {}));
    var TopLevelModule2;
    (function (TopLevelModule2) {
        var SubModule3;
        (function (SubModule3) {
            var ClassA = /** @class */ (function () {
                function ClassA() {
                }
                ClassA.prototype.AisIn2_3 = function () { };
                return ClassA;
            }());
            SubModule3.ClassA = ClassA;
        })(SubModule3 = TopLevelModule2.SubModule3 || (TopLevelModule2.SubModule3 = {}));
    })(TopLevelModule2 || (TopLevelModule2 = {}));
});
//# sourceMappingURL=typeResolution.js.map
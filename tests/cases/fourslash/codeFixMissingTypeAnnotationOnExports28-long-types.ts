/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// fileName: code.ts
////export const sessionLoader = {
////    async loadSession() {
////        if (Math.random() > 0.5) {
////            return {
////                PROP_1: {
////                    name: false,
////                },
////                PROPERTY_2: {
////                    name: 1,
////                },
////                PROPERTY_3: {
////                    name: 1
////                },
////                PROPERTY_4: {
////                    name: 315,
////                },
////            };
////        }
////
////        return {
////            PROP_1: {
////                name: false,
////            },
////            PROPERTY_2: {
////                name: undefined,
////            },
////            PROPERTY_3: {
////            },
////            PROPERTY_4: {
////                name: 576,
////            },
////        };
////    },
////};


const description = "Add return type 'Promise<{\n    PROP_1: {\n        name: boolean;\n    };\n    PROPERTY_2: {\n        name: number;\n    };\n    PROPERTY_3: {\n        name: number;\n    };\n    PROPE...'";
verify.codeFixAvailable([
    { description }
]);

verify.codeFix({
    description,
    index: 0,
    newFileContent:
`export const sessionLoader = {
    async loadSession(): Promise<{
        PROP_1: {
            name: boolean;
        };
        PROPERTY_2: {
            name: number;
        };
        PROPERTY_3: {
            name: number;
        };
        PROPERTY_4: {
            name: number;
        };
    } | {
        PROP_1: {
            name: boolean;
        };
        PROPERTY_2: {
            name: any;
        };
        PROPERTY_3: {
            name?: undefined;
        };
        PROPERTY_4: {
            name: number;
        };
    }> {
        if (Math.random() > 0.5) {
            return {
                PROP_1: {
                    name: false,
                },
                PROPERTY_2: {
                    name: 1,
                },
                PROPERTY_3: {
                    name: 1
                },
                PROPERTY_4: {
                    name: 315,
                },
            };
        }

        return {
            PROP_1: {
                name: false,
            },
            PROPERTY_2: {
                name: undefined,
            },
            PROPERTY_3: {
            },
            PROPERTY_4: {
                name: 576,
            },
        };
    },
};`
});

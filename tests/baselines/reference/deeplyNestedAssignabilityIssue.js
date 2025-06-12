//// [tests/cases/compiler/deeplyNestedAssignabilityIssue.ts] ////

//// [deeplyNestedAssignabilityIssue.ts]
interface A {
    a: number;
}

interface Large {
    something: {
        another: {
            more: {
                thing: A;
            }
            yetstill: {
                another: A;
            }
        }
    }
}

const x: Large = {
    something: {
        another: {
            more: {
                thing: {}
            },
            yetstill: {
                another: {}
            }
        }
    }
}


//// [deeplyNestedAssignabilityIssue.js]
const x = {
    something: {
        another: {
            more: {
                thing: {}
            },
            yetstill: {
                another: {}
            }
        }
    }
};

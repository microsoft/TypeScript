/// <reference path='fourslash.ts' />

////function foo(param) {
////    const a: {
////        a: {
////            a_1: string;
////            a_2: {
////                a_2_1: string;
////            }
////        };
////        b: {
////            b_1: string;
////            b_2: string;
////            b_3: string;
////        };
////        c: {
////            c_1: string;
////            c_2: string;
////            c_3: string;
////            c_4: {
////                c_4_1: {
////                    c_4_1_1: {
////                        c_4_1_1_1: {
////                            c_4_1_1_1_1: string;
////                            c_4_1_1_1_2: string;
////                            c_4_1_1_1_3: string;
////                        }
////                    }
////                }
////            }
////        };
////        d: {
////            d_1: {
////                d_1_1: {
////                    d_1_1_1: string;
////                }
////                d_1_2: {
////                    d_1_2_1: string;
////                }
////                d_1_3: {
////                    d_1_3_1: string;
////                    d_1_3_2: string;
////                }
////            }
////            d_2: string;
////            d_3: string;
////        }
////    } = param;
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:
`function foo(param: {
        a: {
            a_1: string;
            a_2: {
                a_2_1: string;
            };
        }; b: {
            b_1: string;
            b_2: string;
            b_3: string;
        }; c: {
            c_1: string;
            c_2: string;
            c_3: string;
            c_4: {
                c_4_1: {
                    c_4_1_1: {
                        c_4_1_1_1: {
                            c_4_1_1_1_1: string;
                            c_4_1_1_1_2: string;
                            c_4_1_1_1_3: string;
                        };
                    };
                };
            };
        }; d: {
            d_1: {
                d_1_1: {
                    d_1_1_1: string;
                };
                d_1_2: {
                    d_1_2_1: string;
                };
                d_1_3: {
                    d_1_3_1: string;
                    d_1_3_2: string;
                };
            };
            d_2: string;
            d_3: string;
        };
    }) {
    const a: {
        a: {
            a_1: string;
            a_2: {
                a_2_1: string;
            }
        };
        b: {
            b_1: string;
            b_2: string;
            b_3: string;
        };
        c: {
            c_1: string;
            c_2: string;
            c_3: string;
            c_4: {
                c_4_1: {
                    c_4_1_1: {
                        c_4_1_1_1: {
                            c_4_1_1_1_1: string;
                            c_4_1_1_1_2: string;
                            c_4_1_1_1_3: string;
                        }
                    }
                }
            }
        };
        d: {
            d_1: {
                d_1_1: {
                    d_1_1_1: string;
                }
                d_1_2: {
                    d_1_2_1: string;
                }
                d_1_3: {
                    d_1_3_1: string;
                    d_1_3_2: string;
                }
            }
            d_2: string;
            d_3: string;
        }
    } = param;
}`,
});

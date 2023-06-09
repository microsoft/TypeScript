currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/navbar01.ts]
// Interface
interface IPoint {
    getDist(): number;
    new(): IPoint;
    (): any;
    [x:string]: number;
    prop: string;
}

/// Module
module Shapes {
    // Class
    export class Point implements IPoint {
        constructor (public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        // Getter
        get value(): number { return 0; }

        // Setter
        set value(newValue: number) { return; }

        // Static member
        static origin = new Point(0, 0);

        // Static method
        private static getOrigin() { return Point.origin;}
    }

    enum Values { value1, value2, value3 }
}

// Local variables
var p: IPoint = new Shapes.Point(3, 4);
var dist = p.getDist();


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/navbar01.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/navbar01.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/navbar01.ts SVC-1-0 "// Interface\ninterface IPoint {\n    getDist(): number;\n    new(): IPoint;\n    (): any;\n    [x:string]: number;\n    prop: string;\n}\n\n/// Module\nmodule Shapes {\n    // Class\n    export class Point implements IPoint {\n        constructor (public x: number, public y: number) { }\n\n        // Instance member\n        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }\n\n        // Getter\n        get value(): number { return 0; }\n\n        // Setter\n        set value(newValue: number) { return; }\n\n        // Static member\n        static origin = new Point(0, 0);\n\n        // Static method\n        private static getOrigin() { return Point.origin;}\n    }\n\n    enum Values { value1, value2, value3 }\n}\n\n// Local variables\nvar p: IPoint = new Shapes.Point(3, 4);\nvar dist = p.getDist();"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	navbar01.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/navbar01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/navbar01.ts"},"command":"navtree"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "navtree",
     "request_seq": 1,
     "success": true,
     "body": {
      "text": "<global>",
      "kind": "script",
      "kindModifiers": "",
      "spans": [
       {
        "start": {
         "line": 1,
         "offset": 1
        },
        "end": {
         "line": 37,
         "offset": 24
        }
       }
      ],
      "childItems": [
       {
        "text": "dist",
        "kind": "var",
        "kindModifiers": "",
        "spans": [
         {
          "start": {
           "line": 37,
           "offset": 5
          },
          "end": {
           "line": 37,
           "offset": 23
          }
         }
        ],
        "nameSpan": {
         "start": {
          "line": 37,
          "offset": 5
         },
         "end": {
          "line": 37,
          "offset": 9
         }
        }
       },
       {
        "text": "IPoint",
        "kind": "interface",
        "kindModifiers": "",
        "spans": [
         {
          "start": {
           "line": 2,
           "offset": 1
          },
          "end": {
           "line": 8,
           "offset": 2
          }
         }
        ],
        "nameSpan": {
         "start": {
          "line": 2,
          "offset": 11
         },
         "end": {
          "line": 2,
          "offset": 17
         }
        },
        "childItems": [
         {
          "text": "()",
          "kind": "call",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 5,
             "offset": 5
            },
            "end": {
             "line": 5,
             "offset": 13
            }
           }
          ]
         },
         {
          "text": "new()",
          "kind": "construct",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 4,
             "offset": 5
            },
            "end": {
             "line": 4,
             "offset": 19
            }
           }
          ]
         },
         {
          "text": "[]",
          "kind": "index",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 6,
             "offset": 5
            },
            "end": {
             "line": 6,
             "offset": 24
            }
           }
          ]
         },
         {
          "text": "getDist",
          "kind": "method",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 3,
             "offset": 5
            },
            "end": {
             "line": 3,
             "offset": 23
            }
           }
          ],
          "nameSpan": {
           "start": {
            "line": 3,
            "offset": 5
           },
           "end": {
            "line": 3,
            "offset": 12
           }
          }
         },
         {
          "text": "prop",
          "kind": "property",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 7,
             "offset": 5
            },
            "end": {
             "line": 7,
             "offset": 18
            }
           }
          ],
          "nameSpan": {
           "start": {
            "line": 7,
            "offset": 5
           },
           "end": {
            "line": 7,
            "offset": 9
           }
          }
         }
        ]
       },
       {
        "text": "p",
        "kind": "var",
        "kindModifiers": "",
        "spans": [
         {
          "start": {
           "line": 36,
           "offset": 5
          },
          "end": {
           "line": 36,
           "offset": 39
          }
         }
        ],
        "nameSpan": {
         "start": {
          "line": 36,
          "offset": 5
         },
         "end": {
          "line": 36,
          "offset": 6
         }
        }
       },
       {
        "text": "Shapes",
        "kind": "module",
        "kindModifiers": "",
        "spans": [
         {
          "start": {
           "line": 11,
           "offset": 1
          },
          "end": {
           "line": 33,
           "offset": 2
          }
         }
        ],
        "nameSpan": {
         "start": {
          "line": 11,
          "offset": 8
         },
         "end": {
          "line": 11,
          "offset": 14
         }
        },
        "childItems": [
         {
          "text": "Point",
          "kind": "class",
          "kindModifiers": "export",
          "spans": [
           {
            "start": {
             "line": 13,
             "offset": 5
            },
            "end": {
             "line": 30,
             "offset": 6
            }
           }
          ],
          "nameSpan": {
           "start": {
            "line": 13,
            "offset": 18
           },
           "end": {
            "line": 13,
            "offset": 23
           }
          },
          "childItems": [
           {
            "text": "constructor",
            "kind": "constructor",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 14,
               "offset": 9
              },
              "end": {
               "line": 14,
               "offset": 61
              }
             }
            ]
           },
           {
            "text": "getDist",
            "kind": "method",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 17,
               "offset": 9
              },
              "end": {
               "line": 17,
               "offset": 75
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 17,
              "offset": 9
             },
             "end": {
              "line": 17,
              "offset": 16
             }
            }
           },
           {
            "text": "getOrigin",
            "kind": "method",
            "kindModifiers": "private,static",
            "spans": [
             {
              "start": {
               "line": 29,
               "offset": 9
              },
              "end": {
               "line": 29,
               "offset": 59
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 29,
              "offset": 24
             },
             "end": {
              "line": 29,
              "offset": 33
             }
            }
           },
           {
            "text": "origin",
            "kind": "property",
            "kindModifiers": "static",
            "spans": [
             {
              "start": {
               "line": 26,
               "offset": 9
              },
              "end": {
               "line": 26,
               "offset": 41
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 26,
              "offset": 16
             },
             "end": {
              "line": 26,
              "offset": 22
             }
            }
           },
           {
            "text": "value",
            "kind": "getter",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 20,
               "offset": 9
              },
              "end": {
               "line": 20,
               "offset": 42
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 20,
              "offset": 13
             },
             "end": {
              "line": 20,
              "offset": 18
             }
            }
           },
           {
            "text": "value",
            "kind": "setter",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 23,
               "offset": 9
              },
              "end": {
               "line": 23,
               "offset": 48
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 23,
              "offset": 13
             },
             "end": {
              "line": 23,
              "offset": 18
             }
            }
           },
           {
            "text": "x",
            "kind": "property",
            "kindModifiers": "public",
            "spans": [
             {
              "start": {
               "line": 14,
               "offset": 22
              },
              "end": {
               "line": 14,
               "offset": 38
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 14,
              "offset": 29
             },
             "end": {
              "line": 14,
              "offset": 30
             }
            }
           },
           {
            "text": "y",
            "kind": "property",
            "kindModifiers": "public",
            "spans": [
             {
              "start": {
               "line": 14,
               "offset": 40
              },
              "end": {
               "line": 14,
               "offset": 56
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 14,
              "offset": 47
             },
             "end": {
              "line": 14,
              "offset": 48
             }
            }
           }
          ]
         },
         {
          "text": "Values",
          "kind": "enum",
          "kindModifiers": "",
          "spans": [
           {
            "start": {
             "line": 32,
             "offset": 5
            },
            "end": {
             "line": 32,
             "offset": 43
            }
           }
          ],
          "nameSpan": {
           "start": {
            "line": 32,
            "offset": 10
           },
           "end": {
            "line": 32,
            "offset": 16
           }
          },
          "childItems": [
           {
            "text": "value1",
            "kind": "enum member",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 32,
               "offset": 19
              },
              "end": {
               "line": 32,
               "offset": 25
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 32,
              "offset": 19
             },
             "end": {
              "line": 32,
              "offset": 25
             }
            }
           },
           {
            "text": "value2",
            "kind": "enum member",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 32,
               "offset": 27
              },
              "end": {
               "line": 32,
               "offset": 33
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 32,
              "offset": 27
             },
             "end": {
              "line": 32,
              "offset": 33
             }
            }
           },
           {
            "text": "value3",
            "kind": "enum member",
            "kindModifiers": "",
            "spans": [
             {
              "start": {
               "line": 32,
               "offset": 35
              },
              "end": {
               "line": 32,
               "offset": 41
              }
             }
            ],
            "nameSpan": {
             "start": {
              "line": 32,
              "offset": 35
             },
             "end": {
              "line": 32,
              "offset": 41
             }
            }
           }
          ]
         }
        ]
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/navbar01.ts"},"command":"navbar"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "navbar",
     "request_seq": 2,
     "success": true,
     "body": [
      {
       "text": "<global>",
       "kind": "script",
       "kindModifiers": "",
       "spans": [
        {
         "start": {
          "line": 1,
          "offset": 1
         },
         "end": {
          "line": 37,
          "offset": 24
         }
        }
       ],
       "childItems": [
        {
         "text": "dist",
         "kind": "var",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 37,
            "offset": 5
           },
           "end": {
            "line": 37,
            "offset": 23
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "IPoint",
         "kind": "interface",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 2,
            "offset": 1
           },
           "end": {
            "line": 8,
            "offset": 2
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "p",
         "kind": "var",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 36,
            "offset": 5
           },
           "end": {
            "line": 36,
            "offset": 39
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "Shapes",
         "kind": "module",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 11,
            "offset": 1
           },
           "end": {
            "line": 33,
            "offset": 2
           }
          }
         ],
         "childItems": [],
         "indent": 0
        }
       ],
       "indent": 0
      },
      {
       "text": "IPoint",
       "kind": "interface",
       "kindModifiers": "",
       "spans": [
        {
         "start": {
          "line": 2,
          "offset": 1
         },
         "end": {
          "line": 8,
          "offset": 2
         }
        }
       ],
       "childItems": [
        {
         "text": "()",
         "kind": "call",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 5,
            "offset": 5
           },
           "end": {
            "line": 5,
            "offset": 13
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "new()",
         "kind": "construct",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 4,
            "offset": 5
           },
           "end": {
            "line": 4,
            "offset": 19
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "[]",
         "kind": "index",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 6,
            "offset": 5
           },
           "end": {
            "line": 6,
            "offset": 24
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "getDist",
         "kind": "method",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 3,
            "offset": 5
           },
           "end": {
            "line": 3,
            "offset": 23
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "prop",
         "kind": "property",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 7,
            "offset": 5
           },
           "end": {
            "line": 7,
            "offset": 18
           }
          }
         ],
         "childItems": [],
         "indent": 0
        }
       ],
       "indent": 1
      },
      {
       "text": "Shapes",
       "kind": "module",
       "kindModifiers": "",
       "spans": [
        {
         "start": {
          "line": 11,
          "offset": 1
         },
         "end": {
          "line": 33,
          "offset": 2
         }
        }
       ],
       "childItems": [
        {
         "text": "Point",
         "kind": "class",
         "kindModifiers": "export",
         "spans": [
          {
           "start": {
            "line": 13,
            "offset": 5
           },
           "end": {
            "line": 30,
            "offset": 6
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "Values",
         "kind": "enum",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 32,
            "offset": 5
           },
           "end": {
            "line": 32,
            "offset": 43
           }
          }
         ],
         "childItems": [],
         "indent": 0
        }
       ],
       "indent": 1
      },
      {
       "text": "Point",
       "kind": "class",
       "kindModifiers": "export",
       "spans": [
        {
         "start": {
          "line": 13,
          "offset": 5
         },
         "end": {
          "line": 30,
          "offset": 6
         }
        }
       ],
       "childItems": [
        {
         "text": "constructor",
         "kind": "constructor",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 14,
            "offset": 9
           },
           "end": {
            "line": 14,
            "offset": 61
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "getDist",
         "kind": "method",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 17,
            "offset": 9
           },
           "end": {
            "line": 17,
            "offset": 75
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "getOrigin",
         "kind": "method",
         "kindModifiers": "private,static",
         "spans": [
          {
           "start": {
            "line": 29,
            "offset": 9
           },
           "end": {
            "line": 29,
            "offset": 59
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "origin",
         "kind": "property",
         "kindModifiers": "static",
         "spans": [
          {
           "start": {
            "line": 26,
            "offset": 9
           },
           "end": {
            "line": 26,
            "offset": 41
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "value",
         "kind": "getter",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 20,
            "offset": 9
           },
           "end": {
            "line": 20,
            "offset": 42
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "value",
         "kind": "setter",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 23,
            "offset": 9
           },
           "end": {
            "line": 23,
            "offset": 48
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "x",
         "kind": "property",
         "kindModifiers": "public",
         "spans": [
          {
           "start": {
            "line": 14,
            "offset": 22
           },
           "end": {
            "line": 14,
            "offset": 38
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "y",
         "kind": "property",
         "kindModifiers": "public",
         "spans": [
          {
           "start": {
            "line": 14,
            "offset": 40
           },
           "end": {
            "line": 14,
            "offset": 56
           }
          }
         ],
         "childItems": [],
         "indent": 0
        }
       ],
       "indent": 2
      },
      {
       "text": "Values",
       "kind": "enum",
       "kindModifiers": "",
       "spans": [
        {
         "start": {
          "line": 32,
          "offset": 5
         },
         "end": {
          "line": 32,
          "offset": 43
         }
        }
       ],
       "childItems": [
        {
         "text": "value1",
         "kind": "enum member",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 32,
            "offset": 19
           },
           "end": {
            "line": 32,
            "offset": 25
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "value2",
         "kind": "enum member",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 32,
            "offset": 27
           },
           "end": {
            "line": 32,
            "offset": 33
           }
          }
         ],
         "childItems": [],
         "indent": 0
        },
        {
         "text": "value3",
         "kind": "enum member",
         "kindModifiers": "",
         "spans": [
          {
           "start": {
            "line": 32,
            "offset": 35
           },
           "end": {
            "line": 32,
            "offset": 41
           }
          }
         ],
         "childItems": [],
         "indent": 0
        }
       ],
       "indent": 2
      }
     ]
    }
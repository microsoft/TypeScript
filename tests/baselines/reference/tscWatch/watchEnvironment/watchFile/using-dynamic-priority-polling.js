currentDirectory:: /a/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/a/username/projects/project/typescript.ts]
var z = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --w /a/username/projects/project/typescript.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/username/projects/project/typescript.js]
var z = 10;



PolledWatches::
/a/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/a/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

Timeout callback:: count: 1
1: pollLowPollingIntervalQueue *new*

Program root files: [
  "/a/username/projects/project/typescript.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/typescript.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/a/username/projects/project/typescript.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Time spent to Transition libFile and file1 to low priority queue

Input::

Before running Timeout callback:: count: 1
1: pollLowPollingIntervalQueue

After running Timeout callback:: count: 1

Timeout callback:: count: 1
2: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
2: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
3: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
3: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
4: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
4: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
5: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
5: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
6: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
6: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
7: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
7: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
8: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
8: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
9: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
9: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
10: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
10: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
11: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
11: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
12: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
12: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
13: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
13: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
14: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
14: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
15: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
15: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
16: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
16: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
17: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
17: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
18: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
18: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
19: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
19: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
20: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
20: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
21: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
21: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
22: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
22: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
23: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
23: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
24: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
24: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
25: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
25: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
26: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
26: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
27: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
27: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
28: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
28: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
29: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
29: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
30: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
30: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
31: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
31: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
32: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
32: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
33: pollLowPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
33: pollLowPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
34: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
34: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
35: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
35: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
36: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
36: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
37: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
37: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
38: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
38: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
39: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
39: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
40: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
40: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
41: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
41: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
42: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
42: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
43: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
43: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
44: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
44: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
45: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
45: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
46: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
46: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
47: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
47: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
48: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
48: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
49: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
49: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
50: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
50: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
51: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
51: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
52: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
52: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
53: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
53: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
54: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
54: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
55: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
55: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
56: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
56: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
57: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
57: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
58: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
58: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
59: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
59: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
60: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
60: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
61: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
61: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
62: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
62: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
63: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
63: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
64: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
64: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
65: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

Change:: Make change to file

Input::
//// [/a/username/projects/project/typescript.ts]
var zz30 = 100;


Before running Timeout callback:: count: 1
65: pollPollingIntervalQueue

After running Timeout callback:: count: 3

Timeout callback:: count: 3
66: timerToUpdateProgram *new*
67: pollLowPollingIntervalQueue *new*
68: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

Change:: Callbacks: medium priority + high priority queue and scheduled program update

Input::

Before running Timeout callback:: count: 3
66: timerToUpdateProgram
67: pollLowPollingIntervalQueue
68: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/username/projects/project/typescript.js]
var zz30 = 100;



Timeout callback:: count: 2
69: pollLowPollingIntervalQueue *new*
70: pollPollingIntervalQueue *new*


Program root files: [
  "/a/username/projects/project/typescript.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/typescript.ts

Shape signatures in builder refreshed for::
/a/username/projects/project/typescript.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Polling queues polled and everything is in the high polling queue

Input::

Before running Timeout callback:: count: 2
69: pollLowPollingIntervalQueue
70: pollPollingIntervalQueue

Host is moving to new time
Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
71: pollLowPollingIntervalQueue *new*
72: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
71: pollLowPollingIntervalQueue
72: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
73: pollLowPollingIntervalQueue *new*
74: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
73: pollLowPollingIntervalQueue
74: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
75: pollLowPollingIntervalQueue *new*
76: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
75: pollLowPollingIntervalQueue
76: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
77: pollLowPollingIntervalQueue *new*
78: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
77: pollLowPollingIntervalQueue
78: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
79: pollLowPollingIntervalQueue *new*
80: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
79: pollLowPollingIntervalQueue
80: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
81: pollLowPollingIntervalQueue *new*
82: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
81: pollLowPollingIntervalQueue
82: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
83: pollLowPollingIntervalQueue *new*
84: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
83: pollLowPollingIntervalQueue
84: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
85: pollLowPollingIntervalQueue *new*
86: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
85: pollLowPollingIntervalQueue
86: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
87: pollLowPollingIntervalQueue *new*
88: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
87: pollLowPollingIntervalQueue
88: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
89: pollLowPollingIntervalQueue *new*
90: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
89: pollLowPollingIntervalQueue
90: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
91: pollLowPollingIntervalQueue *new*
92: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
91: pollLowPollingIntervalQueue
92: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
93: pollLowPollingIntervalQueue *new*
94: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
93: pollLowPollingIntervalQueue
94: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
95: pollLowPollingIntervalQueue *new*
96: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
95: pollLowPollingIntervalQueue
96: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
97: pollLowPollingIntervalQueue *new*
98: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
97: pollLowPollingIntervalQueue
98: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
99: pollLowPollingIntervalQueue *new*
100: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
99: pollLowPollingIntervalQueue
100: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
101: pollLowPollingIntervalQueue *new*
102: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
101: pollLowPollingIntervalQueue
102: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
103: pollLowPollingIntervalQueue *new*
104: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
103: pollLowPollingIntervalQueue
104: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
105: pollLowPollingIntervalQueue *new*
106: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
105: pollLowPollingIntervalQueue
106: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
107: pollLowPollingIntervalQueue *new*
108: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
107: pollLowPollingIntervalQueue
108: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
109: pollLowPollingIntervalQueue *new*
110: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
109: pollLowPollingIntervalQueue
110: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
111: pollLowPollingIntervalQueue *new*
112: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
111: pollLowPollingIntervalQueue
112: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
113: pollLowPollingIntervalQueue *new*
114: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
113: pollLowPollingIntervalQueue
114: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
115: pollLowPollingIntervalQueue *new*
116: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
115: pollLowPollingIntervalQueue
116: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
117: pollLowPollingIntervalQueue *new*
118: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
117: pollLowPollingIntervalQueue
118: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
119: pollLowPollingIntervalQueue *new*
120: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
119: pollLowPollingIntervalQueue
120: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
121: pollLowPollingIntervalQueue *new*
122: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
121: pollLowPollingIntervalQueue
122: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
123: pollLowPollingIntervalQueue *new*
124: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
123: pollLowPollingIntervalQueue
124: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
125: pollLowPollingIntervalQueue *new*
126: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
125: pollLowPollingIntervalQueue
126: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
127: pollLowPollingIntervalQueue *new*
128: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
127: pollLowPollingIntervalQueue
128: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
129: pollLowPollingIntervalQueue *new*
130: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
129: pollLowPollingIntervalQueue
130: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
131: pollLowPollingIntervalQueue *new*
132: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
131: pollLowPollingIntervalQueue
132: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
133: pollLowPollingIntervalQueue *new*
134: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
133: pollLowPollingIntervalQueue
134: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
135: pollLowPollingIntervalQueue *new*
136: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
135: pollLowPollingIntervalQueue
136: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
137: pollLowPollingIntervalQueue *new*
138: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
137: pollLowPollingIntervalQueue
138: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
139: pollLowPollingIntervalQueue *new*
140: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
139: pollLowPollingIntervalQueue
140: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
141: pollLowPollingIntervalQueue *new*
142: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
141: pollLowPollingIntervalQueue
142: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
143: pollLowPollingIntervalQueue *new*
144: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
143: pollLowPollingIntervalQueue
144: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
145: pollLowPollingIntervalQueue *new*
146: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
145: pollLowPollingIntervalQueue
146: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
147: pollLowPollingIntervalQueue *new*
148: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
147: pollLowPollingIntervalQueue
148: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
149: pollLowPollingIntervalQueue *new*
150: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
149: pollLowPollingIntervalQueue
150: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
151: pollLowPollingIntervalQueue *new*
152: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
151: pollLowPollingIntervalQueue
152: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
153: pollLowPollingIntervalQueue *new*
154: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
153: pollLowPollingIntervalQueue
154: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
155: pollLowPollingIntervalQueue *new*
156: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
155: pollLowPollingIntervalQueue
156: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
157: pollLowPollingIntervalQueue *new*
158: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
157: pollLowPollingIntervalQueue
158: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
159: pollLowPollingIntervalQueue *new*
160: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
159: pollLowPollingIntervalQueue
160: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
161: pollLowPollingIntervalQueue *new*
162: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
161: pollLowPollingIntervalQueue
162: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
163: pollLowPollingIntervalQueue *new*
164: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
163: pollLowPollingIntervalQueue
164: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
165: pollLowPollingIntervalQueue *new*
166: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
165: pollLowPollingIntervalQueue
166: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
167: pollLowPollingIntervalQueue *new*
168: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
167: pollLowPollingIntervalQueue
168: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
169: pollLowPollingIntervalQueue *new*
170: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
169: pollLowPollingIntervalQueue
170: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
171: pollLowPollingIntervalQueue *new*
172: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
171: pollLowPollingIntervalQueue
172: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
173: pollLowPollingIntervalQueue *new*
174: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
173: pollLowPollingIntervalQueue
174: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
175: pollLowPollingIntervalQueue *new*
176: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
175: pollLowPollingIntervalQueue
176: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
177: pollLowPollingIntervalQueue *new*
178: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
177: pollLowPollingIntervalQueue
178: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
179: pollLowPollingIntervalQueue *new*
180: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
179: pollLowPollingIntervalQueue
180: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
181: pollLowPollingIntervalQueue *new*
182: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
181: pollLowPollingIntervalQueue
182: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
183: pollLowPollingIntervalQueue *new*
184: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
183: pollLowPollingIntervalQueue
184: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
185: pollLowPollingIntervalQueue *new*
186: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
185: pollLowPollingIntervalQueue
186: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
187: pollLowPollingIntervalQueue *new*
188: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
187: pollLowPollingIntervalQueue
188: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
189: pollLowPollingIntervalQueue *new*
190: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
189: pollLowPollingIntervalQueue
190: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
191: pollLowPollingIntervalQueue *new*
192: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
191: pollLowPollingIntervalQueue
192: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
193: pollLowPollingIntervalQueue *new*
194: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
193: pollLowPollingIntervalQueue
194: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
195: pollPollingIntervalQueue *new*
196: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
195: pollPollingIntervalQueue
196: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
197: pollPollingIntervalQueue *new*
198: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
197: pollPollingIntervalQueue
198: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
199: pollPollingIntervalQueue *new*
200: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
199: pollPollingIntervalQueue
200: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
201: pollPollingIntervalQueue *new*
202: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
201: pollPollingIntervalQueue
202: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
203: pollPollingIntervalQueue *new*
204: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
203: pollPollingIntervalQueue
204: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
205: pollPollingIntervalQueue *new*
206: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
205: pollPollingIntervalQueue
206: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
207: pollPollingIntervalQueue *new*
208: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
207: pollPollingIntervalQueue
208: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
209: pollPollingIntervalQueue *new*
210: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
209: pollPollingIntervalQueue
210: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
211: pollPollingIntervalQueue *new*
212: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
211: pollPollingIntervalQueue
212: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
213: pollPollingIntervalQueue *new*
214: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
213: pollPollingIntervalQueue
214: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
215: pollPollingIntervalQueue *new*
216: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
215: pollPollingIntervalQueue
216: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
217: pollPollingIntervalQueue *new*
218: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
217: pollPollingIntervalQueue
218: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
219: pollPollingIntervalQueue *new*
220: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
219: pollPollingIntervalQueue
220: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
221: pollPollingIntervalQueue *new*
222: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
221: pollPollingIntervalQueue
222: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
223: pollPollingIntervalQueue *new*
224: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
223: pollPollingIntervalQueue
224: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
225: pollPollingIntervalQueue *new*
226: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
225: pollPollingIntervalQueue
226: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
227: pollPollingIntervalQueue *new*
228: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
227: pollPollingIntervalQueue
228: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
229: pollPollingIntervalQueue *new*
230: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
229: pollPollingIntervalQueue
230: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
231: pollPollingIntervalQueue *new*
232: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
231: pollPollingIntervalQueue
232: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
233: pollPollingIntervalQueue *new*
234: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
233: pollPollingIntervalQueue
234: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
235: pollPollingIntervalQueue *new*
236: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
235: pollPollingIntervalQueue
236: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
237: pollPollingIntervalQueue *new*
238: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
237: pollPollingIntervalQueue
238: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
239: pollPollingIntervalQueue *new*
240: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
239: pollPollingIntervalQueue
240: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
241: pollPollingIntervalQueue *new*
242: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
241: pollPollingIntervalQueue
242: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
243: pollPollingIntervalQueue *new*
244: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
243: pollPollingIntervalQueue
244: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
245: pollPollingIntervalQueue *new*
246: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
245: pollPollingIntervalQueue
246: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
247: pollPollingIntervalQueue *new*
248: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
247: pollPollingIntervalQueue
248: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
249: pollPollingIntervalQueue *new*
250: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
249: pollPollingIntervalQueue
250: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
251: pollPollingIntervalQueue *new*
252: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
251: pollPollingIntervalQueue
252: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
253: pollPollingIntervalQueue *new*
254: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
253: pollPollingIntervalQueue
254: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
255: pollPollingIntervalQueue *new*
256: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
255: pollPollingIntervalQueue
256: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
257: pollPollingIntervalQueue *new*
258: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
257: pollPollingIntervalQueue
258: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
259: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
259: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
260: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

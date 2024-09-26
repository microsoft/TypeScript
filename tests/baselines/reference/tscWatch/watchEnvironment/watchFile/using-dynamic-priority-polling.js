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

Timeout callback:: count: 2
1: pollLowPollingIntervalQueue *new*
2: pollPollingIntervalQueue *new*

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

Before running Timeout callback:: count: 2
1: pollLowPollingIntervalQueue
2: pollPollingIntervalQueue

After running Timeout callback:: count: 2

Timeout callback:: count: 2
3: pollLowPollingIntervalQueue *new*
4: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
3: pollLowPollingIntervalQueue
4: pollPollingIntervalQueue

Host is moving to new time
Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: pollLowPollingIntervalQueue *new*
6: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
5: pollLowPollingIntervalQueue
6: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
7: pollLowPollingIntervalQueue *new*
8: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
7: pollLowPollingIntervalQueue
8: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
9: pollLowPollingIntervalQueue *new*
10: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
9: pollLowPollingIntervalQueue
10: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
11: pollLowPollingIntervalQueue *new*
12: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
11: pollLowPollingIntervalQueue
12: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
13: pollLowPollingIntervalQueue *new*
14: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
13: pollLowPollingIntervalQueue
14: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
15: pollLowPollingIntervalQueue *new*
16: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
15: pollLowPollingIntervalQueue
16: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
17: pollLowPollingIntervalQueue *new*
18: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
17: pollLowPollingIntervalQueue
18: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
19: pollLowPollingIntervalQueue *new*
20: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
19: pollLowPollingIntervalQueue
20: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
21: pollLowPollingIntervalQueue *new*
22: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
21: pollLowPollingIntervalQueue
22: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
23: pollLowPollingIntervalQueue *new*
24: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
23: pollLowPollingIntervalQueue
24: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
25: pollLowPollingIntervalQueue *new*
26: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
25: pollLowPollingIntervalQueue
26: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
27: pollLowPollingIntervalQueue *new*
28: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
27: pollLowPollingIntervalQueue
28: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
29: pollLowPollingIntervalQueue *new*
30: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
29: pollLowPollingIntervalQueue
30: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
31: pollLowPollingIntervalQueue *new*
32: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
31: pollLowPollingIntervalQueue
32: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
33: pollLowPollingIntervalQueue *new*
34: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
33: pollLowPollingIntervalQueue
34: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
35: pollLowPollingIntervalQueue *new*
36: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
35: pollLowPollingIntervalQueue
36: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
37: pollLowPollingIntervalQueue *new*
38: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
37: pollLowPollingIntervalQueue
38: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
39: pollLowPollingIntervalQueue *new*
40: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
39: pollLowPollingIntervalQueue
40: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
41: pollLowPollingIntervalQueue *new*
42: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
41: pollLowPollingIntervalQueue
42: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
43: pollLowPollingIntervalQueue *new*
44: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
43: pollLowPollingIntervalQueue
44: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
45: pollLowPollingIntervalQueue *new*
46: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
45: pollLowPollingIntervalQueue
46: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
47: pollLowPollingIntervalQueue *new*
48: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
47: pollLowPollingIntervalQueue
48: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
49: pollLowPollingIntervalQueue *new*
50: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
49: pollLowPollingIntervalQueue
50: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
51: pollLowPollingIntervalQueue *new*
52: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
51: pollLowPollingIntervalQueue
52: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
53: pollLowPollingIntervalQueue *new*
54: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
53: pollLowPollingIntervalQueue
54: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
55: pollLowPollingIntervalQueue *new*
56: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
55: pollLowPollingIntervalQueue
56: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
57: pollLowPollingIntervalQueue *new*
58: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
57: pollLowPollingIntervalQueue
58: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
59: pollLowPollingIntervalQueue *new*
60: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
59: pollLowPollingIntervalQueue
60: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
61: pollLowPollingIntervalQueue *new*
62: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
61: pollLowPollingIntervalQueue
62: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
63: pollLowPollingIntervalQueue *new*
64: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
63: pollLowPollingIntervalQueue
64: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
65: pollLowPollingIntervalQueue *new*
66: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
65: pollLowPollingIntervalQueue
66: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
67: pollPollingIntervalQueue *new*
68: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
67: pollPollingIntervalQueue
68: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
69: pollPollingIntervalQueue *new*
70: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
69: pollPollingIntervalQueue
70: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
71: pollPollingIntervalQueue *new*
72: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
71: pollPollingIntervalQueue
72: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
73: pollPollingIntervalQueue *new*
74: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
73: pollPollingIntervalQueue
74: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
75: pollPollingIntervalQueue *new*
76: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
75: pollPollingIntervalQueue
76: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
77: pollPollingIntervalQueue *new*
78: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
77: pollPollingIntervalQueue
78: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
79: pollPollingIntervalQueue *new*
80: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
79: pollPollingIntervalQueue
80: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
81: pollPollingIntervalQueue *new*
82: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
81: pollPollingIntervalQueue
82: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
83: pollPollingIntervalQueue *new*
84: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
83: pollPollingIntervalQueue
84: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
85: pollPollingIntervalQueue *new*
86: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
85: pollPollingIntervalQueue
86: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
87: pollPollingIntervalQueue *new*
88: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
87: pollPollingIntervalQueue
88: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
89: pollPollingIntervalQueue *new*
90: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
89: pollPollingIntervalQueue
90: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
91: pollPollingIntervalQueue *new*
92: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
91: pollPollingIntervalQueue
92: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
93: pollPollingIntervalQueue *new*
94: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
93: pollPollingIntervalQueue
94: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
95: pollPollingIntervalQueue *new*
96: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
95: pollPollingIntervalQueue
96: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
97: pollPollingIntervalQueue *new*
98: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
97: pollPollingIntervalQueue
98: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
99: pollPollingIntervalQueue *new*
100: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
99: pollPollingIntervalQueue
100: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
101: pollPollingIntervalQueue *new*
102: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
101: pollPollingIntervalQueue
102: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
103: pollPollingIntervalQueue *new*
104: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
103: pollPollingIntervalQueue
104: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
105: pollPollingIntervalQueue *new*
106: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
105: pollPollingIntervalQueue
106: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
107: pollPollingIntervalQueue *new*
108: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
107: pollPollingIntervalQueue
108: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
109: pollPollingIntervalQueue *new*
110: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
109: pollPollingIntervalQueue
110: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
111: pollPollingIntervalQueue *new*
112: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
111: pollPollingIntervalQueue
112: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
113: pollPollingIntervalQueue *new*
114: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
113: pollPollingIntervalQueue
114: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
115: pollPollingIntervalQueue *new*
116: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
115: pollPollingIntervalQueue
116: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
117: pollPollingIntervalQueue *new*
118: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
117: pollPollingIntervalQueue
118: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
119: pollPollingIntervalQueue *new*
120: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
119: pollPollingIntervalQueue
120: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
121: pollPollingIntervalQueue *new*
122: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
121: pollPollingIntervalQueue
122: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
123: pollPollingIntervalQueue *new*
124: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
123: pollPollingIntervalQueue
124: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
125: pollPollingIntervalQueue *new*
126: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
125: pollPollingIntervalQueue
126: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
127: pollPollingIntervalQueue *new*
128: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
127: pollPollingIntervalQueue
128: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
129: pollPollingIntervalQueue *new*
130: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

Change:: Make change to file

Input::
//// [/a/username/projects/project/typescript.ts]
var zz30 = 100;


Before running Timeout callback:: count: 2
129: pollPollingIntervalQueue
130: pollPollingIntervalQueue

After running Timeout callback:: count: 3

Timeout callback:: count: 3
131: timerToUpdateProgram *new*
132: pollLowPollingIntervalQueue *new*
133: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

Change:: Callbacks: medium priority + high priority queue and scheduled program update

Input::

Before running Timeout callback:: count: 3
131: timerToUpdateProgram
132: pollLowPollingIntervalQueue
133: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/username/projects/project/typescript.js]
var zz30 = 100;



Timeout callback:: count: 2
134: pollLowPollingIntervalQueue *new*
135: pollPollingIntervalQueue *new*


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
134: pollLowPollingIntervalQueue
135: pollPollingIntervalQueue

Host is moving to new time
Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
136: pollLowPollingIntervalQueue *new*
137: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
136: pollLowPollingIntervalQueue
137: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
138: pollLowPollingIntervalQueue *new*
139: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
138: pollLowPollingIntervalQueue
139: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
140: pollLowPollingIntervalQueue *new*
141: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
140: pollLowPollingIntervalQueue
141: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
142: pollLowPollingIntervalQueue *new*
143: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
142: pollLowPollingIntervalQueue
143: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
144: pollLowPollingIntervalQueue *new*
145: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
144: pollLowPollingIntervalQueue
145: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
146: pollLowPollingIntervalQueue *new*
147: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
146: pollLowPollingIntervalQueue
147: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
148: pollLowPollingIntervalQueue *new*
149: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
148: pollLowPollingIntervalQueue
149: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
150: pollLowPollingIntervalQueue *new*
151: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
150: pollLowPollingIntervalQueue
151: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
152: pollLowPollingIntervalQueue *new*
153: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
152: pollLowPollingIntervalQueue
153: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
154: pollLowPollingIntervalQueue *new*
155: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
154: pollLowPollingIntervalQueue
155: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
156: pollLowPollingIntervalQueue *new*
157: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
156: pollLowPollingIntervalQueue
157: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
158: pollLowPollingIntervalQueue *new*
159: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
158: pollLowPollingIntervalQueue
159: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
160: pollLowPollingIntervalQueue *new*
161: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
160: pollLowPollingIntervalQueue
161: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
162: pollLowPollingIntervalQueue *new*
163: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
162: pollLowPollingIntervalQueue
163: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
164: pollLowPollingIntervalQueue *new*
165: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
164: pollLowPollingIntervalQueue
165: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
166: pollLowPollingIntervalQueue *new*
167: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
166: pollLowPollingIntervalQueue
167: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
168: pollLowPollingIntervalQueue *new*
169: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
168: pollLowPollingIntervalQueue
169: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
170: pollLowPollingIntervalQueue *new*
171: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
170: pollLowPollingIntervalQueue
171: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
172: pollLowPollingIntervalQueue *new*
173: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
172: pollLowPollingIntervalQueue
173: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
174: pollLowPollingIntervalQueue *new*
175: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
174: pollLowPollingIntervalQueue
175: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
176: pollLowPollingIntervalQueue *new*
177: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
176: pollLowPollingIntervalQueue
177: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
178: pollLowPollingIntervalQueue *new*
179: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
178: pollLowPollingIntervalQueue
179: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
180: pollLowPollingIntervalQueue *new*
181: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
180: pollLowPollingIntervalQueue
181: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
182: pollLowPollingIntervalQueue *new*
183: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
182: pollLowPollingIntervalQueue
183: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
184: pollLowPollingIntervalQueue *new*
185: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
184: pollLowPollingIntervalQueue
185: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
186: pollLowPollingIntervalQueue *new*
187: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
186: pollLowPollingIntervalQueue
187: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
188: pollLowPollingIntervalQueue *new*
189: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
188: pollLowPollingIntervalQueue
189: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
190: pollLowPollingIntervalQueue *new*
191: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
190: pollLowPollingIntervalQueue
191: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
192: pollLowPollingIntervalQueue *new*
193: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
192: pollLowPollingIntervalQueue
193: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
194: pollLowPollingIntervalQueue *new*
195: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
194: pollLowPollingIntervalQueue
195: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
196: pollLowPollingIntervalQueue *new*
197: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
196: pollLowPollingIntervalQueue
197: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
198: pollLowPollingIntervalQueue *new*
199: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
198: pollLowPollingIntervalQueue
199: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
200: pollLowPollingIntervalQueue *new*
201: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
200: pollLowPollingIntervalQueue
201: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
202: pollLowPollingIntervalQueue *new*
203: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
202: pollLowPollingIntervalQueue
203: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
204: pollLowPollingIntervalQueue *new*
205: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
204: pollLowPollingIntervalQueue
205: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
206: pollLowPollingIntervalQueue *new*
207: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
206: pollLowPollingIntervalQueue
207: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
208: pollLowPollingIntervalQueue *new*
209: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
208: pollLowPollingIntervalQueue
209: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
210: pollLowPollingIntervalQueue *new*
211: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
210: pollLowPollingIntervalQueue
211: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
212: pollLowPollingIntervalQueue *new*
213: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
212: pollLowPollingIntervalQueue
213: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
214: pollLowPollingIntervalQueue *new*
215: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
214: pollLowPollingIntervalQueue
215: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
216: pollLowPollingIntervalQueue *new*
217: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
216: pollLowPollingIntervalQueue
217: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
218: pollLowPollingIntervalQueue *new*
219: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
218: pollLowPollingIntervalQueue
219: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
220: pollLowPollingIntervalQueue *new*
221: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
220: pollLowPollingIntervalQueue
221: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
222: pollLowPollingIntervalQueue *new*
223: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
222: pollLowPollingIntervalQueue
223: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
224: pollLowPollingIntervalQueue *new*
225: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
224: pollLowPollingIntervalQueue
225: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
226: pollLowPollingIntervalQueue *new*
227: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
226: pollLowPollingIntervalQueue
227: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
228: pollLowPollingIntervalQueue *new*
229: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
228: pollLowPollingIntervalQueue
229: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
230: pollLowPollingIntervalQueue *new*
231: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
230: pollLowPollingIntervalQueue
231: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
232: pollLowPollingIntervalQueue *new*
233: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
232: pollLowPollingIntervalQueue
233: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
234: pollLowPollingIntervalQueue *new*
235: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
234: pollLowPollingIntervalQueue
235: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
236: pollLowPollingIntervalQueue *new*
237: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
236: pollLowPollingIntervalQueue
237: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
238: pollLowPollingIntervalQueue *new*
239: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
238: pollLowPollingIntervalQueue
239: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
240: pollLowPollingIntervalQueue *new*
241: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
240: pollLowPollingIntervalQueue
241: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
242: pollLowPollingIntervalQueue *new*
243: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
242: pollLowPollingIntervalQueue
243: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
244: pollLowPollingIntervalQueue *new*
245: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
244: pollLowPollingIntervalQueue
245: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
246: pollLowPollingIntervalQueue *new*
247: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
246: pollLowPollingIntervalQueue
247: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
248: pollLowPollingIntervalQueue *new*
249: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
248: pollLowPollingIntervalQueue
249: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
250: pollLowPollingIntervalQueue *new*
251: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
250: pollLowPollingIntervalQueue
251: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
252: pollLowPollingIntervalQueue *new*
253: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
252: pollLowPollingIntervalQueue
253: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
254: pollLowPollingIntervalQueue *new*
255: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
254: pollLowPollingIntervalQueue
255: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
256: pollLowPollingIntervalQueue *new*
257: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
256: pollLowPollingIntervalQueue
257: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
258: pollLowPollingIntervalQueue *new*
259: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
258: pollLowPollingIntervalQueue
259: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
260: pollPollingIntervalQueue *new*
261: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
260: pollPollingIntervalQueue
261: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
262: pollPollingIntervalQueue *new*
263: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
262: pollPollingIntervalQueue
263: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
264: pollPollingIntervalQueue *new*
265: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
264: pollPollingIntervalQueue
265: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
266: pollPollingIntervalQueue *new*
267: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
266: pollPollingIntervalQueue
267: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
268: pollPollingIntervalQueue *new*
269: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
268: pollPollingIntervalQueue
269: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
270: pollPollingIntervalQueue *new*
271: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
270: pollPollingIntervalQueue
271: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
272: pollPollingIntervalQueue *new*
273: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
272: pollPollingIntervalQueue
273: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
274: pollPollingIntervalQueue *new*
275: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
274: pollPollingIntervalQueue
275: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
276: pollPollingIntervalQueue *new*
277: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
276: pollPollingIntervalQueue
277: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
278: pollPollingIntervalQueue *new*
279: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
278: pollPollingIntervalQueue
279: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
280: pollPollingIntervalQueue *new*
281: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
280: pollPollingIntervalQueue
281: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
282: pollPollingIntervalQueue *new*
283: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
282: pollPollingIntervalQueue
283: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
284: pollPollingIntervalQueue *new*
285: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
284: pollPollingIntervalQueue
285: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
286: pollPollingIntervalQueue *new*
287: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
286: pollPollingIntervalQueue
287: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
288: pollPollingIntervalQueue *new*
289: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
288: pollPollingIntervalQueue
289: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
290: pollPollingIntervalQueue *new*
291: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
290: pollPollingIntervalQueue
291: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
292: pollPollingIntervalQueue *new*
293: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
292: pollPollingIntervalQueue
293: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
294: pollPollingIntervalQueue *new*
295: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
294: pollPollingIntervalQueue
295: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
296: pollPollingIntervalQueue *new*
297: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
296: pollPollingIntervalQueue
297: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
298: pollPollingIntervalQueue *new*
299: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
298: pollPollingIntervalQueue
299: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
300: pollPollingIntervalQueue *new*
301: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
300: pollPollingIntervalQueue
301: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
302: pollPollingIntervalQueue *new*
303: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
302: pollPollingIntervalQueue
303: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
304: pollPollingIntervalQueue *new*
305: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
304: pollPollingIntervalQueue
305: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
306: pollPollingIntervalQueue *new*
307: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
306: pollPollingIntervalQueue
307: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
308: pollPollingIntervalQueue *new*
309: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
308: pollPollingIntervalQueue
309: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
310: pollPollingIntervalQueue *new*
311: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
310: pollPollingIntervalQueue
311: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
312: pollPollingIntervalQueue *new*
313: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
312: pollPollingIntervalQueue
313: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
314: pollPollingIntervalQueue *new*
315: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
314: pollPollingIntervalQueue
315: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
316: pollPollingIntervalQueue *new*
317: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
316: pollPollingIntervalQueue
317: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
318: pollPollingIntervalQueue *new*
319: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
318: pollPollingIntervalQueue
319: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
320: pollPollingIntervalQueue *new*
321: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
320: pollPollingIntervalQueue
321: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
322: pollPollingIntervalQueue *new*
323: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 2
322: pollPollingIntervalQueue
323: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
324: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 1
324: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
325: pollPollingIntervalQueue *new*


exitCode:: ExitStatus.undefined

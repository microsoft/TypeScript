currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/username/project/typescript.ts]
var z = 10;

//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js --w /a/username/project/typescript.ts
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



Program root files: [
  "/a/username/project/typescript.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/username/project/typescript.ts (used version)

exitCode:: ExitStatus.undefined

//// [/a/username/project/typescript.js]
var z = 10;



Change:: Time spent to Transition libFile and file1 to low priority queue

Input::

Before running Timeout callback:: count: 1
1: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
2: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
2: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
3: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
3: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
4: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
4: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
5: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
5: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
6: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
6: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
7: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
7: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
8: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
8: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
9: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
9: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
10: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
10: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
11: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
11: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
12: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
12: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
13: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
13: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
14: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
14: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
15: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
15: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
16: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
16: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
17: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
17: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
18: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
18: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
19: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
19: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
20: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
20: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
21: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
21: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
22: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
22: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
23: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
23: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
24: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
24: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
25: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
25: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
26: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
26: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
27: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
27: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
28: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
28: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
29: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
29: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
30: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
30: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
31: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
31: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
32: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
32: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
33: pollLowPollingIntervalQueue
Before running Timeout callback:: count: 1
33: pollLowPollingIntervalQueue
After running Timeout callback:: count: 1
34: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
34: pollPollingIntervalQueue
After running Timeout callback:: count: 1
35: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
35: pollPollingIntervalQueue
After running Timeout callback:: count: 1
36: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
36: pollPollingIntervalQueue
After running Timeout callback:: count: 1
37: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
37: pollPollingIntervalQueue
After running Timeout callback:: count: 1
38: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
38: pollPollingIntervalQueue
After running Timeout callback:: count: 1
39: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
39: pollPollingIntervalQueue
After running Timeout callback:: count: 1
40: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
40: pollPollingIntervalQueue
After running Timeout callback:: count: 1
41: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
41: pollPollingIntervalQueue
After running Timeout callback:: count: 1
42: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
42: pollPollingIntervalQueue
After running Timeout callback:: count: 1
43: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
43: pollPollingIntervalQueue
After running Timeout callback:: count: 1
44: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
44: pollPollingIntervalQueue
After running Timeout callback:: count: 1
45: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
45: pollPollingIntervalQueue
After running Timeout callback:: count: 1
46: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
46: pollPollingIntervalQueue
After running Timeout callback:: count: 1
47: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
47: pollPollingIntervalQueue
After running Timeout callback:: count: 1
48: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
48: pollPollingIntervalQueue
After running Timeout callback:: count: 1
49: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
49: pollPollingIntervalQueue
After running Timeout callback:: count: 1
50: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
50: pollPollingIntervalQueue
After running Timeout callback:: count: 1
51: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
51: pollPollingIntervalQueue
After running Timeout callback:: count: 1
52: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
52: pollPollingIntervalQueue
After running Timeout callback:: count: 1
53: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
53: pollPollingIntervalQueue
After running Timeout callback:: count: 1
54: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
54: pollPollingIntervalQueue
After running Timeout callback:: count: 1
55: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
55: pollPollingIntervalQueue
After running Timeout callback:: count: 1
56: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
56: pollPollingIntervalQueue
After running Timeout callback:: count: 1
57: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
57: pollPollingIntervalQueue
After running Timeout callback:: count: 1
58: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
58: pollPollingIntervalQueue
After running Timeout callback:: count: 1
59: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
59: pollPollingIntervalQueue
After running Timeout callback:: count: 1
60: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
60: pollPollingIntervalQueue
After running Timeout callback:: count: 1
61: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
61: pollPollingIntervalQueue
After running Timeout callback:: count: 1
62: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
62: pollPollingIntervalQueue
After running Timeout callback:: count: 1
63: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
63: pollPollingIntervalQueue
After running Timeout callback:: count: 1
64: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
64: pollPollingIntervalQueue
After running Timeout callback:: count: 1
65: pollPollingIntervalQueue
Output::

exitCode:: ExitStatus.undefined


Change:: Make change to file

Input::
//// [/a/username/project/typescript.ts]
var zz30 = 100;


Before running Timeout callback:: count: 1
65: pollPollingIntervalQueue
After running Timeout callback:: count: 3
66: timerToUpdateProgram
67: pollLowPollingIntervalQueue
68: pollPollingIntervalQueue
Output::

exitCode:: ExitStatus.undefined


Change:: Callbacks: medium priority + high priority queue and scheduled program update

Input::

Before running Timeout callback:: count: 3
66: timerToUpdateProgram
67: pollLowPollingIntervalQueue
68: pollPollingIntervalQueue
After running Timeout callback:: count: 2
69: pollLowPollingIntervalQueue
70: pollPollingIntervalQueue
Output::
>> Screen clear
[[90m12:00:45 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:49 AM[0m] Found 0 errors. Watching for file changes.



Program root files: [
  "/a/username/project/typescript.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/username/project/typescript.ts

Shape signatures in builder refreshed for::
/a/username/project/typescript.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

//// [/a/username/project/typescript.js]
var zz30 = 100;



Change:: Polling queues polled and everything is in the high polling queue

Input::

Before running Timeout callback:: count: 2
69: pollLowPollingIntervalQueue
70: pollPollingIntervalQueue
After running Timeout callback:: count: 2
71: pollLowPollingIntervalQueue
72: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
71: pollLowPollingIntervalQueue
72: pollPollingIntervalQueue
After running Timeout callback:: count: 2
73: pollLowPollingIntervalQueue
74: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
73: pollLowPollingIntervalQueue
74: pollPollingIntervalQueue
After running Timeout callback:: count: 2
75: pollLowPollingIntervalQueue
76: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
75: pollLowPollingIntervalQueue
76: pollPollingIntervalQueue
After running Timeout callback:: count: 2
77: pollLowPollingIntervalQueue
78: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
77: pollLowPollingIntervalQueue
78: pollPollingIntervalQueue
After running Timeout callback:: count: 2
79: pollLowPollingIntervalQueue
80: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
79: pollLowPollingIntervalQueue
80: pollPollingIntervalQueue
After running Timeout callback:: count: 2
81: pollLowPollingIntervalQueue
82: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
81: pollLowPollingIntervalQueue
82: pollPollingIntervalQueue
After running Timeout callback:: count: 2
83: pollLowPollingIntervalQueue
84: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
83: pollLowPollingIntervalQueue
84: pollPollingIntervalQueue
After running Timeout callback:: count: 2
85: pollLowPollingIntervalQueue
86: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
85: pollLowPollingIntervalQueue
86: pollPollingIntervalQueue
After running Timeout callback:: count: 2
87: pollLowPollingIntervalQueue
88: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
87: pollLowPollingIntervalQueue
88: pollPollingIntervalQueue
After running Timeout callback:: count: 2
89: pollLowPollingIntervalQueue
90: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
89: pollLowPollingIntervalQueue
90: pollPollingIntervalQueue
After running Timeout callback:: count: 2
91: pollLowPollingIntervalQueue
92: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
91: pollLowPollingIntervalQueue
92: pollPollingIntervalQueue
After running Timeout callback:: count: 2
93: pollLowPollingIntervalQueue
94: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
93: pollLowPollingIntervalQueue
94: pollPollingIntervalQueue
After running Timeout callback:: count: 2
95: pollLowPollingIntervalQueue
96: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
95: pollLowPollingIntervalQueue
96: pollPollingIntervalQueue
After running Timeout callback:: count: 2
97: pollLowPollingIntervalQueue
98: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
97: pollLowPollingIntervalQueue
98: pollPollingIntervalQueue
After running Timeout callback:: count: 2
99: pollLowPollingIntervalQueue
100: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
99: pollLowPollingIntervalQueue
100: pollPollingIntervalQueue
After running Timeout callback:: count: 2
101: pollLowPollingIntervalQueue
102: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
101: pollLowPollingIntervalQueue
102: pollPollingIntervalQueue
After running Timeout callback:: count: 2
103: pollLowPollingIntervalQueue
104: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
103: pollLowPollingIntervalQueue
104: pollPollingIntervalQueue
After running Timeout callback:: count: 2
105: pollLowPollingIntervalQueue
106: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
105: pollLowPollingIntervalQueue
106: pollPollingIntervalQueue
After running Timeout callback:: count: 2
107: pollLowPollingIntervalQueue
108: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
107: pollLowPollingIntervalQueue
108: pollPollingIntervalQueue
After running Timeout callback:: count: 2
109: pollLowPollingIntervalQueue
110: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
109: pollLowPollingIntervalQueue
110: pollPollingIntervalQueue
After running Timeout callback:: count: 2
111: pollLowPollingIntervalQueue
112: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
111: pollLowPollingIntervalQueue
112: pollPollingIntervalQueue
After running Timeout callback:: count: 2
113: pollLowPollingIntervalQueue
114: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
113: pollLowPollingIntervalQueue
114: pollPollingIntervalQueue
After running Timeout callback:: count: 2
115: pollLowPollingIntervalQueue
116: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
115: pollLowPollingIntervalQueue
116: pollPollingIntervalQueue
After running Timeout callback:: count: 2
117: pollLowPollingIntervalQueue
118: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
117: pollLowPollingIntervalQueue
118: pollPollingIntervalQueue
After running Timeout callback:: count: 2
119: pollLowPollingIntervalQueue
120: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
119: pollLowPollingIntervalQueue
120: pollPollingIntervalQueue
After running Timeout callback:: count: 2
121: pollLowPollingIntervalQueue
122: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
121: pollLowPollingIntervalQueue
122: pollPollingIntervalQueue
After running Timeout callback:: count: 2
123: pollLowPollingIntervalQueue
124: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
123: pollLowPollingIntervalQueue
124: pollPollingIntervalQueue
After running Timeout callback:: count: 2
125: pollLowPollingIntervalQueue
126: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
125: pollLowPollingIntervalQueue
126: pollPollingIntervalQueue
After running Timeout callback:: count: 2
127: pollLowPollingIntervalQueue
128: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
127: pollLowPollingIntervalQueue
128: pollPollingIntervalQueue
After running Timeout callback:: count: 2
129: pollLowPollingIntervalQueue
130: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
129: pollLowPollingIntervalQueue
130: pollPollingIntervalQueue
After running Timeout callback:: count: 2
131: pollLowPollingIntervalQueue
132: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
131: pollLowPollingIntervalQueue
132: pollPollingIntervalQueue
After running Timeout callback:: count: 2
133: pollLowPollingIntervalQueue
134: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
133: pollLowPollingIntervalQueue
134: pollPollingIntervalQueue
After running Timeout callback:: count: 2
135: pollLowPollingIntervalQueue
136: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
135: pollLowPollingIntervalQueue
136: pollPollingIntervalQueue
After running Timeout callback:: count: 2
137: pollLowPollingIntervalQueue
138: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
137: pollLowPollingIntervalQueue
138: pollPollingIntervalQueue
After running Timeout callback:: count: 2
139: pollLowPollingIntervalQueue
140: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
139: pollLowPollingIntervalQueue
140: pollPollingIntervalQueue
After running Timeout callback:: count: 2
141: pollLowPollingIntervalQueue
142: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
141: pollLowPollingIntervalQueue
142: pollPollingIntervalQueue
After running Timeout callback:: count: 2
143: pollLowPollingIntervalQueue
144: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
143: pollLowPollingIntervalQueue
144: pollPollingIntervalQueue
After running Timeout callback:: count: 2
145: pollLowPollingIntervalQueue
146: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
145: pollLowPollingIntervalQueue
146: pollPollingIntervalQueue
After running Timeout callback:: count: 2
147: pollLowPollingIntervalQueue
148: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
147: pollLowPollingIntervalQueue
148: pollPollingIntervalQueue
After running Timeout callback:: count: 2
149: pollLowPollingIntervalQueue
150: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
149: pollLowPollingIntervalQueue
150: pollPollingIntervalQueue
After running Timeout callback:: count: 2
151: pollLowPollingIntervalQueue
152: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
151: pollLowPollingIntervalQueue
152: pollPollingIntervalQueue
After running Timeout callback:: count: 2
153: pollLowPollingIntervalQueue
154: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
153: pollLowPollingIntervalQueue
154: pollPollingIntervalQueue
After running Timeout callback:: count: 2
155: pollLowPollingIntervalQueue
156: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
155: pollLowPollingIntervalQueue
156: pollPollingIntervalQueue
After running Timeout callback:: count: 2
157: pollLowPollingIntervalQueue
158: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
157: pollLowPollingIntervalQueue
158: pollPollingIntervalQueue
After running Timeout callback:: count: 2
159: pollLowPollingIntervalQueue
160: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
159: pollLowPollingIntervalQueue
160: pollPollingIntervalQueue
After running Timeout callback:: count: 2
161: pollLowPollingIntervalQueue
162: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
161: pollLowPollingIntervalQueue
162: pollPollingIntervalQueue
After running Timeout callback:: count: 2
163: pollLowPollingIntervalQueue
164: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
163: pollLowPollingIntervalQueue
164: pollPollingIntervalQueue
After running Timeout callback:: count: 2
165: pollLowPollingIntervalQueue
166: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
165: pollLowPollingIntervalQueue
166: pollPollingIntervalQueue
After running Timeout callback:: count: 2
167: pollLowPollingIntervalQueue
168: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
167: pollLowPollingIntervalQueue
168: pollPollingIntervalQueue
After running Timeout callback:: count: 2
169: pollLowPollingIntervalQueue
170: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
169: pollLowPollingIntervalQueue
170: pollPollingIntervalQueue
After running Timeout callback:: count: 2
171: pollLowPollingIntervalQueue
172: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
171: pollLowPollingIntervalQueue
172: pollPollingIntervalQueue
After running Timeout callback:: count: 2
173: pollLowPollingIntervalQueue
174: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
173: pollLowPollingIntervalQueue
174: pollPollingIntervalQueue
After running Timeout callback:: count: 2
175: pollLowPollingIntervalQueue
176: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
175: pollLowPollingIntervalQueue
176: pollPollingIntervalQueue
After running Timeout callback:: count: 2
177: pollLowPollingIntervalQueue
178: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
177: pollLowPollingIntervalQueue
178: pollPollingIntervalQueue
After running Timeout callback:: count: 2
179: pollLowPollingIntervalQueue
180: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
179: pollLowPollingIntervalQueue
180: pollPollingIntervalQueue
After running Timeout callback:: count: 2
181: pollLowPollingIntervalQueue
182: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
181: pollLowPollingIntervalQueue
182: pollPollingIntervalQueue
After running Timeout callback:: count: 2
183: pollLowPollingIntervalQueue
184: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
183: pollLowPollingIntervalQueue
184: pollPollingIntervalQueue
After running Timeout callback:: count: 2
185: pollLowPollingIntervalQueue
186: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
185: pollLowPollingIntervalQueue
186: pollPollingIntervalQueue
After running Timeout callback:: count: 2
187: pollLowPollingIntervalQueue
188: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
187: pollLowPollingIntervalQueue
188: pollPollingIntervalQueue
After running Timeout callback:: count: 2
189: pollLowPollingIntervalQueue
190: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
189: pollLowPollingIntervalQueue
190: pollPollingIntervalQueue
After running Timeout callback:: count: 2
191: pollLowPollingIntervalQueue
192: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
191: pollLowPollingIntervalQueue
192: pollPollingIntervalQueue
After running Timeout callback:: count: 2
193: pollLowPollingIntervalQueue
194: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
193: pollLowPollingIntervalQueue
194: pollPollingIntervalQueue
After running Timeout callback:: count: 2
195: pollPollingIntervalQueue
196: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
195: pollPollingIntervalQueue
196: pollPollingIntervalQueue
After running Timeout callback:: count: 2
197: pollPollingIntervalQueue
198: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
197: pollPollingIntervalQueue
198: pollPollingIntervalQueue
After running Timeout callback:: count: 2
199: pollPollingIntervalQueue
200: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
199: pollPollingIntervalQueue
200: pollPollingIntervalQueue
After running Timeout callback:: count: 2
201: pollPollingIntervalQueue
202: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
201: pollPollingIntervalQueue
202: pollPollingIntervalQueue
After running Timeout callback:: count: 2
203: pollPollingIntervalQueue
204: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
203: pollPollingIntervalQueue
204: pollPollingIntervalQueue
After running Timeout callback:: count: 2
205: pollPollingIntervalQueue
206: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
205: pollPollingIntervalQueue
206: pollPollingIntervalQueue
After running Timeout callback:: count: 2
207: pollPollingIntervalQueue
208: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
207: pollPollingIntervalQueue
208: pollPollingIntervalQueue
After running Timeout callback:: count: 2
209: pollPollingIntervalQueue
210: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
209: pollPollingIntervalQueue
210: pollPollingIntervalQueue
After running Timeout callback:: count: 2
211: pollPollingIntervalQueue
212: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
211: pollPollingIntervalQueue
212: pollPollingIntervalQueue
After running Timeout callback:: count: 2
213: pollPollingIntervalQueue
214: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
213: pollPollingIntervalQueue
214: pollPollingIntervalQueue
After running Timeout callback:: count: 2
215: pollPollingIntervalQueue
216: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
215: pollPollingIntervalQueue
216: pollPollingIntervalQueue
After running Timeout callback:: count: 2
217: pollPollingIntervalQueue
218: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
217: pollPollingIntervalQueue
218: pollPollingIntervalQueue
After running Timeout callback:: count: 2
219: pollPollingIntervalQueue
220: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
219: pollPollingIntervalQueue
220: pollPollingIntervalQueue
After running Timeout callback:: count: 2
221: pollPollingIntervalQueue
222: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
221: pollPollingIntervalQueue
222: pollPollingIntervalQueue
After running Timeout callback:: count: 2
223: pollPollingIntervalQueue
224: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
223: pollPollingIntervalQueue
224: pollPollingIntervalQueue
After running Timeout callback:: count: 2
225: pollPollingIntervalQueue
226: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
225: pollPollingIntervalQueue
226: pollPollingIntervalQueue
After running Timeout callback:: count: 2
227: pollPollingIntervalQueue
228: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
227: pollPollingIntervalQueue
228: pollPollingIntervalQueue
After running Timeout callback:: count: 2
229: pollPollingIntervalQueue
230: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
229: pollPollingIntervalQueue
230: pollPollingIntervalQueue
After running Timeout callback:: count: 2
231: pollPollingIntervalQueue
232: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
231: pollPollingIntervalQueue
232: pollPollingIntervalQueue
After running Timeout callback:: count: 2
233: pollPollingIntervalQueue
234: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
233: pollPollingIntervalQueue
234: pollPollingIntervalQueue
After running Timeout callback:: count: 2
235: pollPollingIntervalQueue
236: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
235: pollPollingIntervalQueue
236: pollPollingIntervalQueue
After running Timeout callback:: count: 2
237: pollPollingIntervalQueue
238: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
237: pollPollingIntervalQueue
238: pollPollingIntervalQueue
After running Timeout callback:: count: 2
239: pollPollingIntervalQueue
240: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
239: pollPollingIntervalQueue
240: pollPollingIntervalQueue
After running Timeout callback:: count: 2
241: pollPollingIntervalQueue
242: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
241: pollPollingIntervalQueue
242: pollPollingIntervalQueue
After running Timeout callback:: count: 2
243: pollPollingIntervalQueue
244: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
243: pollPollingIntervalQueue
244: pollPollingIntervalQueue
After running Timeout callback:: count: 2
245: pollPollingIntervalQueue
246: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
245: pollPollingIntervalQueue
246: pollPollingIntervalQueue
After running Timeout callback:: count: 2
247: pollPollingIntervalQueue
248: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
247: pollPollingIntervalQueue
248: pollPollingIntervalQueue
After running Timeout callback:: count: 2
249: pollPollingIntervalQueue
250: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
249: pollPollingIntervalQueue
250: pollPollingIntervalQueue
After running Timeout callback:: count: 2
251: pollPollingIntervalQueue
252: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
251: pollPollingIntervalQueue
252: pollPollingIntervalQueue
After running Timeout callback:: count: 2
253: pollPollingIntervalQueue
254: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
253: pollPollingIntervalQueue
254: pollPollingIntervalQueue
After running Timeout callback:: count: 2
255: pollPollingIntervalQueue
256: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
255: pollPollingIntervalQueue
256: pollPollingIntervalQueue
After running Timeout callback:: count: 2
257: pollPollingIntervalQueue
258: pollPollingIntervalQueue
Before running Timeout callback:: count: 2
257: pollPollingIntervalQueue
258: pollPollingIntervalQueue
After running Timeout callback:: count: 1
259: pollPollingIntervalQueue
Before running Timeout callback:: count: 1
259: pollPollingIntervalQueue
After running Timeout callback:: count: 1
260: pollPollingIntervalQueue
Output::

exitCode:: ExitStatus.undefined


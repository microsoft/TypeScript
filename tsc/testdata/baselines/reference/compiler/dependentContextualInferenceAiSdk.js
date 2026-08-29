//// [tests/cases/compiler/dependentContextualInferenceAiSdk.ts] ////

//// [dependentContextualInferenceAiSdk.ts]
declare const streamText:
  <T extends {
    tools: {
      [K in keyof T["tools"]]: {
        inputSchema: { "~type": unknown },
        execute: (input: T["tools"][K]["inputSchema"]["~type"]) => unknown
      }
    },
  }> (t: T) => {}

declare const z: 
  { object:
      <T extends Record<string, { "~type": unknown }>>(t: T) =>
        { "~type": { [K in keyof T]: T[K]["~type"] } }
  , string: () => { "~type": string }
  }

streamText({
  tools: {
    getWeather: {
      inputSchema: z.object({ location: z.string() }),      
      execute: input => {
        const _check: { location: string } = input
        return "whatever"
      }
    }
  },
})
  

//// [dependentContextualInferenceAiSdk.js]
"use strict";
streamText({
    tools: {
        getWeather: {
            inputSchema: z.object({ location: z.string() }),
            execute: input => {
                const _check = input;
                return "whatever";
            }
        }
    },
});

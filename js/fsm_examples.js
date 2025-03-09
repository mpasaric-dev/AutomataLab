var fsm_examples = {
  "DFA AB": {
    type: "DFA",
    dfa: {
      transitions: {
        start: { A: "s0" },
        s0: { B: "s1" },
        s1: { A: "s2" },
        s2: { B: "s1" },
      },
      startState: "start",
      acceptStates: ["s1"],
    },
    states: {
      start: {},
      s0: { top: 186, left: 208 },
      s1: { isAccept: true, top: 296, left: 231 },
      s2: { top: 372, left: 70 },
    },
    transitions: [
      { stateA: "start", label: "A", stateB: "s0" },
      { stateA: "s0", label: "B", stateB: "s1" },
      { stateA: "s1", label: "A", stateB: "s2" },
      { stateA: "s2", label: "B", stateB: "s1" },
    ],
    bulkTests: {
      accept: "AB\nABAB\nABABAB",
      reject: "\nA\nB\nABA\nBA\nBB\nABABB",
    },
  },
  "NFA AB": {
    type: "NFA",
    nfa: {
      transitions: {
        start: { A: ["s0"] },
        s0: { B: ["s1"] },
        s1: { "": ["start"] },
      },
      startState: "start",
      acceptStates: ["s1"],
    },
    states: {
      start: {},
      s0: { top: 150, left: 245 },
      s1: { isAccept: true, top: 327, left: 224 },
    },
    transitions: [
      { stateA: "start", label: "A", stateB: "s0" },
      { stateA: "s0", label: "B", stateB: "s1" },
      { stateA: "s1", label: "ϵ", stateB: "start" },
    ],
    bulkTests: {
      accept: "AB\nABAB\nABABAB",
      reject: "\nA\nB\nABA\nBA\nBB\nABABB",
    },
  },
  "PDA Match AB": {
    type: "PDA",
    pda: {
      transitions: {
        start: {
          A: { "": [] },
          B: { "": [] },
          "": { "": [{ state: "s4", stackPushChar: "#" }] },
        },
        s0: {
          A: { "": [{ state: "s0", stackPushChar: "A" }] },
          B: { A: [{ state: "s1", stackPushChar: "" }] },
        },
        s1: {
          B: { A: [{ state: "s1", stackPushChar: "" }], "#": [] },
          A: { "": [{ state: "s0", stackPushChar: "A" }] },
          "": { "#": [{ state: "s4", stackPushChar: "#" }] },
        },
        s2: {
          B: { "": [{ state: "s2", stackPushChar: "B" }] },
          A: { B: [{ state: "s3", stackPushChar: "" }] },
        },
        s3: {
          B: { "": [{ state: "s2", stackPushChar: "B" }] },
          A: { B: [{ state: "s3", stackPushChar: "" }], "#": [] },
          "": { "#": [{ state: "s4", stackPushChar: "#" }] },
        },
        s4: {
          A: { "": [{ state: "s0", stackPushChar: "A" }] },
          B: { "": [{ state: "s2", stackPushChar: "B" }] },
        },
      },
      startState: "start",
      acceptStates: ["s4"],
    },
    states: {
      start: {},
      s4: { isAccept: true, top: 228, left: 184 },
      s0: { top: 109, left: 203 },
      s1: { top: 121, left: 554 },
      s2: { top: 419, left: 307 },
      s3: { top: 414, left: 605 },
    },
    transitions: [
      { stateA: "start", label: "ϵ,ϵ,#", stateB: "s4" },
      { stateA: "s0", label: "A,ϵ,A", stateB: "s0" },
      { stateA: "s0", label: "B,A,ϵ", stateB: "s1" },
      { stateA: "s1", label: "B,A,ϵ", stateB: "s1" },
      { stateA: "s1", label: "A,ϵ,A", stateB: "s0" },
      { stateA: "s1", label: "ϵ,#,#", stateB: "s4" },
      { stateA: "s2", label: "B,ϵ,B", stateB: "s2" },
      { stateA: "s2", label: "A,B,ϵ", stateB: "s3" },
      { stateA: "s3", label: "B,ϵ,B", stateB: "s2" },
      { stateA: "s3", label: "A,B,ϵ", stateB: "s3" },
      { stateA: "s3", label: "ϵ,#,#", stateB: "s4" },
      { stateA: "s4", label: "A,ϵ,A", stateB: "s0" },
      { stateA: "s4", label: "B,ϵ,B", stateB: "s2" },
    ],
    bulkTests: {
      accept: "AB\nABAB\nABABAB\nBA\nAAABBB\nAABBBBBAAA",
      reject: "A\nB\nABA\nBB\nABABB",
    },
  },
};

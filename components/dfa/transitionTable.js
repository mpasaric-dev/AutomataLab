//states, symbols, transitions, start state, accept states
class TransitionTable extends HTMLElement {
  static get observedAttributes() {
    return ["transitions", "accept-states", "start-state", "states", "symbols"];
  }
  constructor() {
    super();
    // Attach a shadow root to the element
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Create a style element
    const styles = document.createElement("style");
    styles.textContent = `
            div {
                background-color: #f9f9f9;
                padding: 16px;
            }
            table {
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
            }
        `;

    // Append the style to the shadow root
    shadowRoot.appendChild(styles);

    // Create some content for our component
    const content = document.createElement("table");
    this.table = content;

    // Append the content to the shadow root
    shadowRoot.appendChild(content);
  }

  connectedCallback() {
    console.log("connected!");
    if (!this.transitions) {
      this.transitions = {start: {}, accept: {}};
    }
    if (!this.acceptStates) {
      this.acceptStates = ["accept"];
    }
    if (!this.startState) {
      this.startState = "start";
    }
    if (!this.states) {
      this.states = ["start", "accept"];
    }
    if (!this.symbols) {
      this.symbols = [];
    }


    const headRow = document.createElement("tr");
    const cornerCell = document.createElement("th");
    cornerCell.innerHTML = "&nbsp";
    headRow.appendChild(cornerCell);
    for (const symbol of this.symbols) {
        const headCell = document.createElement("th");
        headCell.innerText = symbol;
        headRow.appendChild(headCell);
    }
    this.table.appendChild(headRow);
    for (const state of this.states) {
        const row = document.createElement("tr");
        const stateCell = document.createElement("td");
        stateCell.innerText = state;
        row.appendChild(stateCell);
        for (const symbol of this.symbols) {
            const cell = document.createElement("td");
            cell.innerText = this.transitions[state][symbol] || "";
            row.appendChild(cell);
        }
        this.table.appendChild(row);
    }
  }

  disconnectedCallback() {
    console.log("disconnected!");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
    if(name==='symbols') {
        this.symbols = newVal.split(',');
    }
    if(name==='states') {
        this.states = newVal.split(',');
    }
    if(name==='start-state') {
        this.startState = newVal;
    }
    if(name==='accept-states') {
        this.acceptStates = newVal.split(',');
    }
    if(name==='transitions') {
        this.transitions = JSON.parse(newVal);
    }
  }

  adoptedCallback() {
    console.log("adopted!");
  }
}
customElements.define("dfa-transition-table", TransitionTable);

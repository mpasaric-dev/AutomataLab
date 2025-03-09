customElements.define(
  "dfa-element",
  class extends HTMLElement {
    static get observedAttributes() {
      return ['transitions', 'accept-states', 'start-state', 'processor'];
    }

    constructor() {
      super();
      let dfa = document.getElementById("dfatemplate");
      let mydfa = dfa.content;
      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        mydfa.cloneNode(true),
      );
    }

    connectedCallback() {
      console.log("DFA added to DOM");
      if(!this.transitions) {
          this.transitions = {};
      }
      if(!this.acceptStates) {

      }
    }

    disconnectedCallback() {
      console.log("Rating removed from DOM");
    }

    adoptedCallback() {
      console.log("Rating was moved into a new DOM");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`)
        }
    }
  },
);

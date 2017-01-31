// Extend the base HTMLElement class
// in es5 you would instread do Object.create(HTMLElement)
class AppLogo extends HTMLElement {
  connectedCallback() {
      this.render();
  }
  
  // when make use of the contructor be sure to call super!
  constructor() {
    super();
    //this.render();
  }
  
  // render our component to the DOM
  // render and renderString are where we could be clever
  // but for now we are just going to write the string to innerHTML
  render() {
    this.innerHTML = this.renderString();  
  }
  
  // just returns a string;
  renderString() {
    return `
      <div>
        <h1>Our Logo Text</h1> 
      </div>
    `;
  }
}

// Register our element with the custom elements API
window.customElements.define('app-logo', AppLogo);
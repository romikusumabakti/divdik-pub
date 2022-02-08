import { html, render } from "./modules/standalone.js";
import App from "./App.js";

render(html`<${App} />`, document.body);

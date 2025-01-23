import EOcalendar from './lib/EO-calendar.svelte';

if (!customElements.get('eo-calendar')) {
    customElements.define('eo-calendar', EOcalendar);
}

// In Svelte 3, do this instead:
// customElements.define('my-element', MyElement);
// import './app.css'
// import App from './App.svelte'

// const app = new App({
//   target: document.getElementById('app'),
// })

// export default app
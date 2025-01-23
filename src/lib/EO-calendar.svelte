<svelte:options
  customElement={{
    tag: "eo-calendar",
    shadow: "none",
  }}
/>

<script>
  import { onMount } from "svelte";
  import { state, formatNumber } from "../stores/store.js"; // Import the store
  import { flip } from "svelte/animate";

  let dataInfo = null;

  const endpoint = `https://gastondelallana.com.ar/api/eo-calendar-events/`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      dataInfo = data.data;

      console.log(dataInfo);

      // if (dataInfo.data) {
      //   const customCss = dataInfo.data.attributes.custom_css;
      //   const styleElement = document.createElement("style");
      //   styleElement.textContent = customCss;
      //   const customElement = document.querySelector("ln-quien-es-quien");
      //   customElement.shadowRoot.appendChild(styleElement);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  onMount(async () => {
    await getData();
  });

  // const DURATION = 500; // animation duration in ms

  // const currentValue = 2.3343; // variable a formatear
  // let orderAlphabetically = false

  // $: counter = $state.counter;
  // $: candidatos = $state.candidatesDetails;
  // $: containerW = $state.containerWidth;

  // $: orderedScores = candidatesScores
  //   .map((d) => {
  //     //nueva prop candidato key
  //     const key = Object.keys(d)[0];
  //     //nueva prop puntos
  //     const pts = Object.values(d)[0];
  //     //nueva prop promedio
  //     const prom = pts.reduce((acc, val) => acc + val, 0) / pts.length;
  //     return { pts, prom, key };
  //   })
  //   .sort((a, b) => b.prom - a.prom);

  // $: if (orderAlphabetically) {
  //   orderedScores = orderedScores.sort((a, b) => a.key.localeCompare(b.key));
  // } else {
  //   orderedScores = orderedScores.sort((a, b) => b.prom - a.prom);
  // }

  // const incrementCounter = () => {
  //   $state.counter = $state.counter + 1;
  // };
  // const reorder = () => {
  //   orderAlphabetically = !orderAlphabetically
  // };
</script>

<div class="comp">
  <h1>EO calendar</h1>
  <div class="calendar-container">
    {#if dataInfo}
      {#each dataInfo as element}
        <div class="card-container">
          <div>Este es el {element.eventName}</div>
          <div>{element.date}</div>
          <div>{element.time}</div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  div.calendar-container {
    display: flex;

    div.card-container {
      border: 1px solid black;
      padding: 1rem;
      margin: 1rem;
    }
  }
</style>

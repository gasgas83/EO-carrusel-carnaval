<svelte:options
  customElement={{
    tag: "eo-calendar",
    shadow: "none",
  }}
/>

<script>
  import { onMount, tick } from "svelte";
  import { state, formatNumber } from "../stores/store.js"; // Import the store
  import { flip } from "svelte/animate";

  import Flickity from "flickity";
  import "flickity/css/flickity.css";
  import dayjs from "dayjs";

  console.log(dayjs("2025/01/27 15:30").isBefore(dayjs()));

  let dataInfo = null;
  let dataOk = true;
  let flickityLoaded = false;
  let diaDeHoy = dayjs().format("YYYY-MM-DD");
  console.log(diaDeHoy);

  const startFlickity = () => {
    const flkty = new Flickity(".main-carousel", {
      // options
      cellAlign: "left",
      contain: true,
      // wrapAround: true,
      prevNextButtons: true,
      pageDots: true,
      // autoPlay: 2000,
    });

    flickityLoaded = true;
  };

  const endpoint = `https://gastondelallana.com.ar/api/eo-calendar-events/`;
  const getData = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      dataInfo = data.data;
      console.log(dataInfo);
    } catch (error) {
      console.log(error);
    }
  };

  $: dataOrder = dataInfo && dataInfo.sort((a, b) => a.date.localeCompare(b.date));

  $: dataClean = dataOrder && dataOrder.filter((d) => d.date >= diaDeHoy);

  onMount(async () => {
    await getData();

    await tick();

    const element = document.querySelector(".carousel-cell");
    if (element) {
      startFlickity();
    } else {
      console.warn("El elemento para Flickity no está en el DOM");
    }
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
  <div class="heading">
    <h2>Calendario de eventos</h2>
    <div class="logo"></div>
  </div>

  <div class="main-carousel">
    {#if dataInfo && dataOk}
      {#each dataInfo as element}
        <div class="carousel-cell">
          <div>Este es el {element.eventName}</div>
          <div>{element.date}</div>
          <div>{element.time}</div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- <div class="main-carousel">
    <div class="carousel-cell">
      <div>Este es el 1</div>
      <div>xxxxx</div>
      <div>xxxxxx</div>
    </div>
  </div> -->
</div>

<style lang="scss">
  @import "https://unpkg.com/flickity@2/dist/flickity.min.css";
  @font-face {
    font-display: swap;
    font-family: Instrument Sans Condensed;
    font-style: normal;
    font-weight: 400;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Regular.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Regular.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Regular.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Regular.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Regular.svg#Instrument_Sans_Condensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans Condensed;
    font-style: normal;
    font-weight: 500;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Medium.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Medium.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Medium.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Medium.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-Medium.svg#Instrument_Sans_Condensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans Condensed;
    font-style: normal;
    font-weight: 600;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-SemiBold.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-SemiBold.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-SemiBold.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-SemiBold.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansCondensed-SemiBold.svg#Instrument_Sans_Condensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans SemiCondensed;
    font-style: normal;
    font-weight: 400;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Regular.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Regular.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Regular.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Regular.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Regular.svg#Instrument_Sans_SemiCondensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans SemiCondensed;
    font-style: normal;
    font-weight: 500;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Medium.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Medium.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Medium.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Medium.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Medium.svg#Instrument_Sans_SemiCondensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans SemiCondensed;
    font-style: normal;
    font-weight: 600;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Bold.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Bold.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Bold.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Bold.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSansSemiCondensed-Bold.svg#Instrument_Sans_SemiCondensed) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans;
    font-style: normal;
    font-weight: 400;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Regular.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Regular.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Regular.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Regular.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Regular.svg#Instrument_Sans) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans;
    font-style: normal;
    font-weight: 500;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Medium.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Medium.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Medium.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Medium.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Medium.svg#Instrument_Sans) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Instrument Sans;
    font-style: normal;
    font-weight: 600;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Bold.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Bold.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Bold.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Bold.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/InstrumentSans-Bold.svg#Instrument_Sans) format("svg");
  }

  @font-face {
    font-display: swap;
    font-family: Libre Baskerville;
    font-style: normal;
    font-weight: 400;
    src:
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/LibreBaskerville-Regular.eot?) format("eot"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/LibreBaskerville-Regular.woff2) format("woff2"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/LibreBaskerville-Regular.woff) format("woff"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/LibreBaskerville-Regular.ttf) format("truetype"),
      url(https://www.elobservador.com.uy/css-custom/elobservador/fonts/LibreBaskerville-Regular.svg#Libre_Baskerville) format("svg");
  }

  h2 {
    font-family: "Libre Baskerville", serif;
    font-size: 22px;
  }

  div.main-carousel {
    // height: 120px;
    position: relative;

    div.carousel-cell {
      position: absolute;
      width: 220px;
      background-color: #ddd;
      margin: 10px;
    }
  }
</style>

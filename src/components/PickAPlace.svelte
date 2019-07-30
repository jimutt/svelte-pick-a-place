<script>
  import { onMount, setContext } from 'svelte';
  import { LEAFLET_CTX } from '../constants';
  import LeafletPositionPicker from './LeafletPositionPicker.svelte';

  export let leaflet;
  export let lat = 45;
  export let lng = 0;
  export let zoom = 3;
  export let guideOverlay = true;
  export let buttons = true;
  export let selectionModes = ['point', 'polygon'];

  setContext(LEAFLET_CTX, {
    getMap: () => map,
    getLeaflet: () => leaflet
  });

  let mapElement;
  let map;

  onMount(() => {
    if (leaflet == null) {
      throw new Error('No Leaflet instance was provided.');
    }

    map = leaflet.map(mapElement).setView([lat, lng], zoom);
    leaflet
      .tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
      })
      .addTo(map);
  });
</script>

<style>
  .pick-a-place {
    width: 100%;
    height: 100%;
  }

  :global(.pick-a-place__overlay-container) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 401;
    pointer-events: none;
  }

  :global(.pick-a-place__overlay-content) {
    position: relative;
    width: 100%;
    height: 100%;
  }

  :global(.pick-a-place__button) {
    font-size: 1rem;
    font-family: inherit;
    overflow: visible;
    text-transform: none;
    margin-bottom: 5px;
    padding: 0.5em;
    background-color: #fff;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
  }

  :global(.pick-a-place__button.active) {
    font-weight: bold;
  }

  :global(.pick-a-place__button:hover:not([disabled])) {
    cursor: pointer;
    background: #eee;
  }
</style>

<div class="pick-a-place" bind:this={mapElement}>

  <div class="pick-a-place__overlay-container">
    <div class="pick-a-place__overlay-content">
      <slot />
      {#if map}
        <LeafletPositionPicker
          {guideOverlay}
          {buttons}
          {selectionModes}
          on:update
          on:save
          on:cancel />
      {/if}
    </div>
  </div>

</div>

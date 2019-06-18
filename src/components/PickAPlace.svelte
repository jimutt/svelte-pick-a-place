<script>
  import { onMount, setContext } from 'svelte';
  import LeafletPositionPicker from './LeafletPositionPicker.svelte';

  export let leaflet;
  export let lat = 45;
  export let lng = 0;
  export let zoom = 3;
  export let guideOverlay = true;
  export let buttons = true;

  setContext('leaflet', {
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
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(map);
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
  }

  :global(.pick-a-place__overlay-content) {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<div class="pick-a-place" bind:this={mapElement}>

  <div class="pick-a-place__overlay-container">
    <div class="pick-a-place__overlay-content">
      <slot />
      {#if map}
        <LeafletPositionPicker {guideOverlay} {buttons} on:update on:save on:cancel />
      {/if}
    </div>
  </div>

</div>

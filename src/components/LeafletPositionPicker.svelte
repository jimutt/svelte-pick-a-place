<script>
  import LeafletMarker from './LeafletMarker.svelte';
  import { LEAFLET_CTX } from '../constants';
  import { getContext } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let placeMarker = true;
  export let guideOverlay = true;
  export let buttons = true;

  let lat;
  let lng;

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  let map = getMap();
  map.on('click', e => {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    dispatch('update', e.latlng);
  });
</script>

<style>
  /* Global styles for easy override */
  :global(.pick-a-place__guide-panel) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.5rem;
    color: white;
  }

  :global(.pick-a-place__button-panel) {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 2rem 0;
    text-align: center;
    z-index: 401;
  }

  :global(.pick-a-place__button-panel > button) {
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0 0.5rem;
  }
</style>

{#if lat && lng}
  <LeafletMarker {lat} {lng} />
{/if}
{#if guideOverlay}
  <div class="pick-a-place__guide-panel" data-testid="guide-overlay">
    {#if lat && lng}
      <span>Latitude: {lat.toFixed(5)} Longitude: {lng.toFixed(5)}</span>
    {:else}
      <span>Click the map to select a position</span>
    {/if}
  </div>
{/if}

{#if buttons}
  <div class="pick-a-place__button-panel" data-testid="button-overlay">
    <button on:click|stopPropagation={() => dispatch('cancel')}>Cancel</button>
    <button
      disabled={!(lat && lng)}
      on:click|stopPropagation={() => dispatch('save', { lat, lng })}>
      Use location
    </button>
  </div>
{/if}

<script>
  import { LEAFLET_CTX } from '../constants';
  import { getContext, tick } from 'svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import DrawingToolbar from './drawing/DrawingToolbar.svelte';
  import PointPicker from './PointPicker.svelte';
  import PolygonPicker from './PolygonPicker.svelte';
  import { leafletGeometryToGeoJSON } from '../utils/geojson';
  import latLngEquals from '../utils/latLngEquals';

  const dispatch = createEventDispatcher();

  export let placeMarker = true;
  export let guideOverlay = true;
  export let buttons = true;
  export let selectionModes;
  export let selectionMode = '';

  let position = null;
  let selectionComplete = false;

  onMount(() => {
    selectionMode = selectionModes[0];
  });

  function isPointOrPolygon(leafletPosition) {
    return (
      !Array.isArray(leafletPosition) ||
      (leafletPosition.length > 2 &&
        latLngEquals(leafletPosition[0], leafletPosition[leafletPosition.length - 1]))
    );
  }

  const setPosition = (pos, selectionCompleted = false) => {
    selectionComplete = selectionCompleted;
    position = pos;
    if (isPointOrPolygon(position)) {
      dispatch('update', leafletGeometryToGeoJSON(position));
    }
  };

  $: polygonInstructionText = computePolygonText(position);

  const computePolygonText = position => {
    if (position == null || !position.length) return 'Select polygon start position';
    else if (selectionComplete) return 'Selection complete';
    else if (position.length <= 2) return 'Select the next point';
    else if (position.length > 2)
      return 'Add additional points or click the start position to finish editing.';
  };

  const completePolygon = polygon => {
    setPosition(polygon, true);
  };

  const handleSetMode = ({ detail }) => {
    selectionComplete = false;
    selectionMode = detail;
  };

  const resetSelection = async ({ detail }) => {
    selectionComplete = false;
    position = null;

    const currentMode = selectionMode;
    selectionMode = -1;
    await tick();
    selectionMode = currentMode;
  };
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
    pointer-events: all;
  }

  :global(.pick-a-place__button-panel button) {
    padding: 0.5em 1em;
    margin: 0.5rem;
    font-size: 1.1rem;
  }
</style>

<DrawingToolbar mode={selectionMode} {selectionModes} on:setMode={handleSetMode} />

{#if selectionMode === 'point'}
  <PointPicker on:update={({ detail }) => setPosition(detail, true)} />
{:else if selectionMode === 'polygon'}
  <PolygonPicker
    on:update={({ detail }) => setPosition(detail)}
    on:complete={({ detail }) => completePolygon(detail)} />
{/if}

{#if guideOverlay}
  <div class="pick-a-place__guide-panel" data-testid="guide-overlay">
    {#if selectionMode === 'point'}
      {#if position != null && position.lat != null}
        <span>Latitude: {position.lat.toFixed(5)} Longitude: {position.lng.toFixed(5)}</span>
      {:else}
        <span>Click the map to select a position</span>
      {/if}
    {:else if selectionMode === 'polygon'}
      <span>{polygonInstructionText}</span>
    {/if}
  </div>
{/if}

{#if buttons}
  <div class="pick-a-place__button-panel" data-testid="button-overlay">
    <button
      class="pick-a-place__button"
      type="button"
      on:click|stopPropagation={() => dispatch('cancel')}>
      Cancel
    </button>
    {#if selectionMode === 'polygon' && selectionComplete}
      <button class="pick-a-place__button" type="button" on:click|stopPropagation={resetSelection}>
        Clear selection
      </button>
    {/if}
    <button
      class="pick-a-place__button"
      type="button"
      disabled={!selectionComplete}
      on:click|stopPropagation={() => dispatch('save', leafletGeometryToGeoJSON(position))}>
      Use selection
    </button>
  </div>
{/if}

<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { LEAFLET_CTX } from '../../constants';

  const dispatch = createEventDispatcher();
  const { getMap, getLeaflet } = getContext(LEAFLET_CTX);

  export let mode;
  export let selectionModes = ['point', 'polygon'];

  const setMode = newMode => {
    mode = newMode;
    dispatch('setMode', mode);
  };

  const editModeEnabled = editMode => {
    return selectionModes.includes(editMode);
  };
</script>

<style>
  :global(.pick-a-place__drawing-toolbar-wrapper) {
    position: absolute;
    left: 10px;
    top: 120px;
    width: auto;
    height: auto;
    z-index: 401;
    pointer-events: all;
  }

  :global(.pick-a-place__drawing-toolbar) {
    background-color: #fff;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
  }

  :global(.pick-a-place__drawing-toolbar h4) {
    text-align: center;
    margin: 0 0 5px 0;
  }

  :global(.pick-a-place__drawing-toolbar button) {
    display: block;
    width: 100%;
  }
</style>

<div class="pick-a-place__drawing-toolbar-wrapper">
  {#if selectionModes.length > 1}
    <div class="pick-a-place__drawing-toolbar">
      <h4>Mode</h4>
      {#if editModeEnabled('point')}
        <button
          data-testid="point-mode-btn"
          class="pick-a-place__button"
          class:active={mode === 'point'}
          on:click|stopPropagation={() => setMode('point')}>
          Point
        </button>
      {/if}
      {#if editModeEnabled('polygon')}
        <button
          data-testid="polygon-mode-btn"
          class="pick-a-place__button"
          class:active={mode === 'polygon'}
          on:click|stopPropagation={() => setMode('polygon')}>
          Polygon
        </button>
      {/if}
    </div>
  {/if}
</div>

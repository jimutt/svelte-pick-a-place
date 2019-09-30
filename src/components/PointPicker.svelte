<script>
  import { LEAFLET_CTX } from '../constants';
  import { getContext } from 'svelte';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import LeafletMarker from './LeafletMarker.svelte';
  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  export let selection;

  let lat;
  let lng;
  let map = getMap();

  onMount(() => {
    if (selection != null && selection.geometry.type === 'Point') {
      lng = selection.geometry.coordinates[0];
      lat = selection.geometry.coordinates[1];
    }
  });

  const onMapClick = e => {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    dispatch('update', e.latlng);
  };

  map.on('click', onMapClick);

  onDestroy(() => map.off('click', onMapClick));
</script>

{#if lat && lng}
  <LeafletMarker {lat} {lng} />
{/if}

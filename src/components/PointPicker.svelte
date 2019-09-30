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
      setLngLat(selection.geometry.coordinates[0], selection.geometry.coordinates[1]);
    }
  });

  const setLngLat = (longitude, latitude) => {
    lng = longitude;
    lat = latitude;
    dispatch('update', { lng, lat });
  };

  const onMapClick = e => {
    setLngLat(e.latlng.lng, e.latlng.lat);
  };

  map.on('click', onMapClick);
  onDestroy(() => map.off('click', onMapClick));
</script>

{#if lat && lng}
  <LeafletMarker {lat} {lng} />
{/if}

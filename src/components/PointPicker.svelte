<script>
  import { LEAFLET_CTX } from '../constants';
  import { getContext } from 'svelte';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import LeafletMarker from './LeafletMarker.svelte';

  let lat;
  let lng;

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  let map = getMap();

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

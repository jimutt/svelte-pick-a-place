<script>
  import { getContext, onDestroy } from 'svelte';
  import { LEAFLET_CTX } from '../constants';

  const { getMap, getLeaflet } = getContext(LEAFLET_CTX);

  export let lat;
  export let lng;

  let map = getMap();
  let leaflet = getLeaflet();

  let marker;

  $: {
    if (lat && lng) {
      if (!marker) marker = leaflet.marker([lat, lng]).addTo(map);
      else marker.setLatLng([lat, lng]);
    } else if (marker) {
      map.removeLayer(marker);
    }
  }

  onDestroy(() => {
    if (marker) map.removeLayer(marker);
  });
</script>

<script>
  import { getContext, onDestroy, createEventDispatcher } from 'svelte';
  import { LEAFLET_CTX } from '../constants';

  const { getMap, getLeaflet } = getContext(LEAFLET_CTX);
  const dispatch = createEventDispatcher();

  export let lat;
  export let lng;
  export let clickable = false;

  let map = getMap();
  let leaflet = getLeaflet();

  let marker;

  const handleClick = () => {
    if (clickable) dispatch('click');
  };

  $: {
    if (lat && lng) {
      if (!marker) {
        marker = leaflet.marker([lat, lng]).addTo(map);
        marker.on('click', handleClick);
      } else marker.setLatLng([lat, lng]);
    } else if (marker) {
      map.removeLayer(marker);
    }
  }

  onDestroy(() => {
    if (marker) map.removeLayer(marker);
  });
</script>

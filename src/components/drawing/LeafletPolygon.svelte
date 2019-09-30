<script>
  import { LEAFLET_CTX } from '../../constants';
  import { getContext, onDestroy, onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import LeafletMarker from '../LeafletMarker.svelte';
  import latLngEquals from '../../utils/latLngEquals';

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  export let coordinates = [];

  const map = getMap();

  let polyline = L.polyline([], { color: 'red' }).addTo(map);
  let polygon = L.polygon([], { color: 'red' }).addTo(map);

  onMount(() => updatePolygon());

  $: if (coordinates.length > 0) {
    updatePolygon();
  }

  $: allowClosingPolygon =
    coordinates.length > 2 && !latLngEquals(coordinates[0], coordinates[coordinates.length - 1]);

  function updatePolygon() {
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    if (coordinates.length > 1 && latLngEquals(first, last)) {
      polygon.setLatLngs([coordinates]);
      polyline.setLatLngs([]);
      dispatch('complete', coordinates);
    } else {
      polyline.setLatLngs(coordinates);
      polygon.setLatLngs([]);
    }
  }

  function closePolygon() {
    coordinates = [...coordinates, coordinates[0]];
  }

  onDestroy(() => {
    map.removeLayer(polyline);
    map.removeLayer(polygon);
  });
</script>

{#if coordinates.length > 0 && polyline.getLatLngs().length > 0}
  <LeafletMarker
    lat={coordinates[0].lat}
    lng={coordinates[0].lng}
    clickable={allowClosingPolygon}
    on:click={closePolygon} />
{/if}

<script>
  import { LEAFLET_CTX } from '../../constants';
  import { getContext, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import LeafletMarker from '../LeafletMarker.svelte';
  import latLngEquals from '../../utils/latLngEquals';

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  export let coordinates = [];

  const map = getMap();

  let polyline = L.polyline([], { color: 'red' }).addTo(map);
  let polygon = L.polygon([], { color: 'red' }).addTo(map);

  $: if (coordinates.length > 0) {
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    if (coordinates.length > 1 && latLngEquals(first, last)) {
      polygon.setLatLngs([coordinates]);
      polyline.setLatLngs([]);
    } else {
      polyline.setLatLngs(coordinates);
      polygon.setLatLngs([]);
    }
  }

  $: allowClosingPolygon =
    coordinates.length > 2 && !latLngEquals(coordinates[0], coordinates[coordinates.length - 1]);

  const closePolygon = () => {
    coordinates = [...coordinates, coordinates[0]];
    dispatch('complete', [coordinates]);
  };

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

<script>
  import { LEAFLET_CTX } from '../constants';
  import { getContext } from 'svelte';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import LeafletPolygon from './drawing/LeafletPolygon.svelte';
  import latLngEquals from '../utils/latLngEquals';

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  export let selection;

  let coordinates = [];
  let map = getMap();

  if (selection != null && selection.geometry.type === 'Polygon') {
    coordinates = selection.geometry.coordinates[0].map(c => ({
      lat: c[1],
      lng: c[0]
    }));
  }

  const onMapClick = e => {
    if (coordinates.length > 2 && latLngEquals(coordinates[0], coordinates[coordinates.length - 1]))
      return;
    coordinates = [...coordinates, e.latlng];
    dispatch('update', coordinates);
  };
  map.on('click', onMapClick);

  onDestroy(() => map.off('click', onMapClick));
</script>

<LeafletPolygon bind:coordinates on:complete={({ detail }) => dispatch('complete', detail)} />

<script>
  import { LEAFLET_CTX } from '../constants';
  import { getContext } from 'svelte';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import LeafletPolygon from './drawing/LeafletPolygon.svelte';
  import latLngEquals from '../utils/latLngEquals';

  const dispatch = createEventDispatcher();
  const { getMap } = getContext(LEAFLET_CTX);

  let coordinates = [];

  let map = getMap();

  const onMapClick = e => {
    if (coordinates.length > 2 && latLngEquals(coordinates[0], coordinates[coordinates.length - 1]))
      return;
    coordinates = [...coordinates, e.latlng];
    dispatch('update', coordinates);
  };
  map.on('click', onMapClick);

  onDestroy(() => map.off('click', onMapClick));
</script>

<LeafletPolygon
  bind:coordinates
  on:update={({ detail }) => dispatch('update', detail)}
  on:complete={({ detail }) => dispatch('complete', detail)} />

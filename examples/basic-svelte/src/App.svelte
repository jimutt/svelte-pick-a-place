<script>
  import leaflet from 'leaflet';
  import PickAPlace from 'svelte-pick-a-place';

  function handleUpdate({ detail }) {
    console.log('Update event! ', detail);
  }

  function handleCancel({ detail }) {
    console.log('Cancel event! ', detail);
  }

  function handleSave({ detail }) {
    console.log('Save event! ', detail);
  }
</script>

<style>
  .map-container {
    height: 100vh;
  }
</style>

<div class="map-container">
  <PickAPlace
    {leaflet}
    on:update={handleUpdate}
    on:cancel={handleCancel}
    on:save={handleSave}
    selection={{ type: 'Feature', geometry: { type: 'Point', coordinates: [4.570312500000001, 46.07323062540835] } }} />
</div>

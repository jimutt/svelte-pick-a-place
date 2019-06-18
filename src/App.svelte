<script>
  import PickAPlace from './components/components.module.js';
</script>

<style>
  .map-container {
    height: 800px;
  }
</style>

<div class="map-container">
  <PickAPlace
    leaflet={window.L}
    on:update={() => console.log('Update!')}
    on:save={() => console.log('On save!')} />
</div>

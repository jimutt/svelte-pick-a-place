<script>
  import PickAPlace from './components/components.module.js';
</script>

<style>
  .map-container {
    height: 800px;
  }

  :global(html, body) {
    font-size: 14px;
  }
</style>

<div class="map-container">
  <PickAPlace
    leaflet={window.L}
    on:update={e => console.log('Update!', e.detail)}
    on:save={e => console.log('On save!', e.detail)} />
</div>

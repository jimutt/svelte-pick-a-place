# WORK IN PROGRESS

Properties and events will change without major version bump, do not use in production.

# Svelte component to pick a position from a leaflet map.

Created primarily to evaluate the usage of standalone Svelte components in legacy apps. The component presents a Leaflet map on which the user can click to select a position. When the position is updated an `update` event is emitted.

## Usage

The component comes with basic styling and is made to fill the parent container. You need to supply a Leaflet instance to the component's `leaflet` prop.

### Example in Svelte app:

```html
<script>
  import PickAPlace from 'svelte-pick-a-place';
</script>

<PickAPlace leaflet={leaflet} on:update={() => console.log('Update!')} on:save={() =>
console.log('On save!')} />
```

### Example usage with Javascript API in legacy app:

Include IIFE build from jsdelivr:

```
<script src="https://cdn.jsdelivr.net/npm/svelte-pick-a-place/dist/pick-a-place.min.js"></script>
```

Add component:

```javascript
let pickAPlace = new PickAPlace({
  target: document.getElementById('map'),
  props: {
    leaflet: window.L
  }
});

// Listen to events through component.$on('eventName', callback)
pickAPlace.$on('update', ({ details }) => {
  console.log('New position: ', details);
});
```

## Properties

- **leaflet** - Leaflet instance
- **lat** - wgs84 latitude. Set to 45 by default.
- **lng** - wgs84 longitude. Set to 0 by default.
- **zoom** - Map zoom level. Set to 3 by default.
- **guideOverlay** - Show text overlay with instructions and picked lat/lng. True by default.
- **buttons** - Show cancel & save buttons. True by default.

## Events

- **update** - Emitted on new selected location. `details` property contains a Leaflet lat/lng object.
- **save** - Emitted on save button click.
- **cancel** - Emitted on cancel button click.

## Credits

The component was originally created from the component project template by Yogev: https://github.com/YogliB/svelte-component-template

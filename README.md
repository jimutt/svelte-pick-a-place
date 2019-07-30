[![npm version](https://badge.fury.io/js/svelte-pick-a-place.png)](https://badge.fury.io/js/svelte-pick-a-place)

# WORK IN PROGRESS

Functionality, properties and events will change without major version bump, do not use in production.

# Svelte component for position and area selection with Leaflet.

The component presents a Leaflet map on which the user can click to select a position or an area (through drawing a polygon). When the selection is updated an `update` event is emitted.

**Codepen demo: https://codepen.io/jimutt/pen/XLjaqV**

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

Include IIFE build and stylesheet from unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.css" />
<script src="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.min.js"></script>
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
pickAPlace.$on('update', ({ detail }) => {
  console.log('New position: ', detail);
});
```

## Properties

- **leaflet** - Leaflet instance
- **lat** - wgs84 latitude. Set to 45 by default.
- **lng** - wgs84 longitude. Set to 0 by default.
- **zoom** - Map zoom level. Set to 3 by default.
- **guideOverlay** - Show text overlay with instructions and picked lat/lng. True by default.
- **buttons** - Show cancel & save buttons. True by default.
- **selectionModes** - Array with enabled selection modes. Default: `['point', 'polygon']`

## Events

- **update** - Emitted on new selected location. The `detail` property of the event object contains the selection. If selection mode is "point" a Leaflet lat/lng object is returned. If selection mode is "polygon" the update event is emitted for each added point, the `detail` property will contain array with all lat/lng points of the polygon.
- **save** - Emitted on save button click. The `detail` property of the event object contains the selection. If selection mode is "point" a Leaflet lat/lng object is returned. If selection mode is "polygon" an array consisting of lat/lng points for all polygon coordinates is returned.
- **cancel** - Emitted on cancel button click.

## Credits

The component was originally created from the component project template by Yogev: https://github.com/YogliB/svelte-component-template

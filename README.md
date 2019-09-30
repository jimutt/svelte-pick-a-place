[![npm version](https://badge.fury.io/js/svelte-pick-a-place.png)](https://badge.fury.io/js/svelte-pick-a-place)

# Svelte component for position and area selection with Leaflet.

The component presents a Leaflet map on which the user can click to select a position or an area (through drawing a polygon). `update` and `save` events are emitted with the selected geometry in GeoJSON format.

**Codepen demo JS API: https://codepen.io/jimutt/pen/XLjaqV**

**Codepen demo Bootstrap 3 form + modal: https://codepen.io/jimutt/pen/ZgaYBP?editors=1010**

## Usage

The component comes with basic styling and is made to fill the parent container. You need to supply a Leaflet instance to the component's `leaflet` prop.

### Example in Svelte app:

```html
<script>
  import leaflet from 'leaflet';
  import PickAPlace from 'svelte-pick-a-place';
</script>

<PickAPlace leaflet={leaflet} on:update={() => console.log('Update!')} on:save={() =>
console.log('On save!')} />
```

### Example usage with Javascript API in legacy app:

Include IIFE build and stylesheet from unpkg, use the "-legacy" suffixed JS file if you need IE11 support and don't mind the much larger file size:

```html
<link rel="stylesheet" href="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.css" />
<script src="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.min.js"></script>

<!-- Or use build with IE11 support: -->
<script src="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place-legacy.min.js"></script>
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
- **selection** - Default position/area, supports a GeoJSON feature with a geometry object of type `Point` or type `Polygon`

## Events

- **update** - Emitted on new selected location. The `detail` property of the event object contains the selection. If selection mode is "point" a GeoJSON feature with Point geometry is returned. If selection mode is "polygon" the update event is emitted when she polygon is finished/closed, the `detail` property will contain a GeoJSON feature with Polygon geometry.
- **save** - Emitted on save button click. The `detail` property of the event object contains the selection. If selection mode is "point" a GeoJSON feature with Point geometry is returned. If selection mode is "polygon" the `detail` property will contain a GeoJSON feature with Polygon geometry.
- **cancel** - Emitted on cancel button click.

## TODO

- More tests, test coverage is extremely poor at the moment.
- Well-written docs.

### Credits

The component was originally created from the component project template by Yogev: https://github.com/YogliB/svelte-component-template

import latLngEquals from './latLngEquals.js';

/**
 * Convert Leaflet lat/lng types to GeoJSON.
 * @param {Object|Object[]} coordinates If coordinates is an array of lat/lng objects a FeatureCollection with polygon features is returned. If coordinates is a single lat/lng object a single point feature is returned.
 */
export function leafletGeometryToGeoJSON(coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return pointFeature(coordinates);
  } else {
    if (
      coordinates.length > 2 &&
      latLngEquals(coordinates[0], coordinates[coordinates.length - 1])
    ) {
      return polygonFeature(coordinates);
    } else {
      return lineStringFeature(coordinates);
    }
  }
}

export function polygonFeature(latLngs) {
  return feature({
    type: 'Polygon',
    coordinates: [latLngs.map(c => [c.lng, c.lat])]
  });
}

export function lineStringFeature(latLngs) {
  return feature({
    type: 'LineString',
    coordinates: [latLngs.map(c => [c.lng, c.lat])]
  });
}

export function pointFeature(latLng) {
  return feature({
    type: 'Point',
    coordinates: [latLng.lng, latLng.lat]
  });
}

export function feature(geometry) {
  return {
    type: 'Feature',
    geometry
  };
}

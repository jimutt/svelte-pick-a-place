import { leafletGeometryToGeoJSON } from '../geojson';

describe('leafletGeometryToGeoJSON', () => {
  it('creates point feature for single lat/lng object', () => {
    const latLng = { lat: 10.12, lng: 11.32 };
    const geojson = leafletGeometryToGeoJSON(latLng);

    expect(geojson).toEqual({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [latLng.lng, latLng.lat]
      }
    });
  });

  it('creates linestring feature for array with length of 2', () => {
    const latLngs = [{ lat: 10.12, lng: 11.32 }, { lat: 10.12, lng: 11.32 }];
    const geojson = leafletGeometryToGeoJSON(latLngs);

    expect(geojson).toEqual({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [latLngs.map(c => [c.lng, c.lat])]
      }
    });
  });

  it('creates polygon feature for array with length of 3', () => {
    const latLngs = [{ lat: 10.12, lng: 11.32 }, { lat: 12, lng: 13 }, { lat: 10.12, lng: 11.32 }];
    const geojson = leafletGeometryToGeoJSON(latLngs);

    expect(geojson).toEqual({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [latLngs.map(c => [c.lng, c.lat])]
      }
    });
  });
});

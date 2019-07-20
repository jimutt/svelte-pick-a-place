import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, wait } from '@testing-library/svelte';
import PickAPlace from '../PickAPlace.svelte';
import leaflet from 'leaflet';

beforeEach(cleanup);

test('renders Leaflet map when an instance is provided', async () => {
  render(PickAPlace, { props: { leaflet } });

  await wait(() => document.getElementsByClassName('leaflet-pane').length > 0);
  const leafletPane = document.getElementsByClassName('leaflet-pane');

  expect(leafletPane.length).toBeGreaterThan(0);
});

test('throws if no Leaflet instance is provided', async () => {
  expect(() => render(PickAPlace)).toThrow();
});

test('shows guide overlay by default', async () => {
  const { getByTestId } = render(PickAPlace, { props: { leaflet } });

  expect(getByTestId('guide-overlay')).toBeVisible();
});

test('hides guide overlay if guideOverlay prop set to false', async () => {
  const { queryByTestId } = render(PickAPlace, { props: { leaflet, guideOverlay: false } });

  expect(queryByTestId('guide-overlay')).toBeNull();
});

test('shows button overlay by default', async () => {
  const { getByTestId } = render(PickAPlace, { props: { leaflet } });

  expect(getByTestId('button-overlay')).toBeVisible();
});

test('hides button overlay if buttons prop set to false', async () => {
  const { queryByTestId } = render(PickAPlace, { props: { leaflet, buttons: false } });

  expect(queryByTestId('button-overlay')).toBeNull();
});

test('sets leaflet latitude to value of lat prop', async () => {
  const setViewMock = jest.fn();
  const lMock = { map: () => ({ setView: setViewMock }), tileLayer: () => ({ addTo: jest.fn() }) };

  const lat = 12.42;

  render(PickAPlace, { props: { leaflet: lMock, lat } });

  const latArg = setViewMock.mock.calls[0][0][0];
  expect(latArg).toBe(lat);
});

test('sets leaflet longitude to value of lng prop', async () => {
  const setViewMock = jest.fn();
  const lMock = { map: () => ({ setView: setViewMock }), tileLayer: () => ({ addTo: jest.fn() }) };

  const lng = 51.21;

  render(PickAPlace, { props: { leaflet: lMock, lng } });

  const latArg = setViewMock.mock.calls[0][0][1];
  expect(latArg).toBe(lng);
});

test('sets leaflet zoom to value of zoom prop', async () => {
  const setViewMock = jest.fn();
  const lMock = { map: () => ({ setView: setViewMock }), tileLayer: () => ({ addTo: jest.fn() }) };

  const zoom = 17;

  render(PickAPlace, { props: { leaflet: lMock, zoom } });

  const latArg = setViewMock.mock.calls[0][1];
  expect(latArg).toBe(zoom);
});

const apiRoot = 'http://localhost:3000';

import { expect, describe,  it } from "vitest";

describe('API', () => {
  it('Lists all types', async () => {
    const types = await fetch(`${apiRoot}/types`).then((res) => res.json());
    expect(types.length > 0)
    expect(types[0]).toHaveProperty('type');
  }),
  it('Lists all vehicles', async () => {
    const vehicles = await fetch(`${apiRoot}/vehicles`).then((res) => res.json());
    expect(vehicles.length > 0)
    expect(vehicles[0]).toHaveProperty('reg');
  })
  it('Lists all bookings', async () => {
    const bookings = await fetch(`${apiRoot}/bookings`).then((res) => res.json());
    expect( bookings.length > 0)
    expect(bookings[0]).toHaveProperty('from');
  })
})
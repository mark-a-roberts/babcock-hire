const apiRoot = 'http://localhost:3000';

import { describe,  it } from "vitest";

describe('API', () => {
  it('Lists all vehicles', async () => {
    const vehicles = await fetch(`${apiRoot}/vehicles`).then((res) => res.json());
    expect(vehicles.length > 0)
  })
})
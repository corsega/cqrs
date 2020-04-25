import EventHandlerResponse from './EventHandlerResponse';
import Pizza from './Mock/Pizza';

describe('EventHandlerResponse', () => {
  it('Gets response payload', async () => {
    const order = {
      id: 134,
      pizza: new Pizza(),
      name: 'John Doe',
    };

    const response = new EventHandlerResponse(order);

    expect(response.getResponse()).toBe(order);
  });
});

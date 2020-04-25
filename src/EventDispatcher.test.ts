import EventDispatcherResponse from './EventDispatcherResponse';
import OrderPizza from './Mock/Event/OrderPizza';
import UnregisteredEvent from './Mock/Event/UnregisteredEvent';
import pizzaDispatcher from './Mock/pizzaDispatcher';
import EventHandlerResponse from './EventHandlerResponse';

describe('EventDispatcher', () => {
  it('Dispatches a registered event', async () => {
    const response = await pizzaDispatcher.dispatch(
      new OrderPizza({
        ingredients: ['pepperoni', 'tomatoes'],
      }),
    );

    expect(response).toBeInstanceOf(EventDispatcherResponse);

    expect(response.SaveOrderHandler).toBeInstanceOf(EventHandlerResponse);
  });

  it('Dispatches an unregistered event', async () => {
    const response = await pizzaDispatcher.dispatch(new UnregisteredEvent());

    expect(response).toBeInstanceOf(EventDispatcherResponse);
  });
});

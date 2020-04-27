import OrderPizza from './mock/event/OrderPizza';
import pizzaDispatcher from './mock/PizzaDispatcher';
import EventDispatcherRequest from './EventDispatcherRequest';
import SaveOrderHandler from './mock/handler/SaveOrderHandler';
import Context from './Context';

describe('EventDispatcherRequest', () => {
  const request = new EventDispatcherRequest();

  const event = new OrderPizza({
    ingredients: ['pepperoni', 'tomatoes'],
  });

  const handler = new SaveOrderHandler();

  const context = new Context().setDispatcher(pizzaDispatcher);

  it('Executes event handler', async () => {
    const response = await request.handle(event, handler, context);

    expect(response.order.id).toBe('order-id');
  });
});

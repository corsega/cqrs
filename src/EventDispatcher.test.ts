import EventDispatcherResponse from './EventDispatcherResponse';
import OrderPizza from './mock/event/OrderPizza';
import OrderSaved from './mock/event/OrderSaved';
import UnregisteredEvent from './mock/event/UnregisteredEvent';
import pizzaDispatcher from './mock/pizzaDispatcher';
import VeggiePizza from './mock/VeggiePizza';
import InvalidOrder from './mock/event/InvalidOrder';

describe('EventDispatcher', () => {
  it('Dispatches a registered event', async () => {
    const response = await pizzaDispatcher.dispatch(
      new OrderPizza({
        ingredients: ['pepperoni', 'tomatoes'],
      }),
    );

    expect(response).toBeInstanceOf(EventDispatcherResponse);

    expect(response.SaveOrderHandler.order.id).toBe('order-id');

    expect(response.NotifyCustomerHandler.notification.id).toBe('notification-id');

    const response2 = await pizzaDispatcher.dispatch(new OrderSaved(new VeggiePizza()));

    expect(response2.SendInvoiceHandler.invoice.id).toBe('invoice-id');
  });

  it('Dispatches an unregistered event', async () => {
    const response = await pizzaDispatcher.dispatch(new UnregisteredEvent());

    expect(response).toBeInstanceOf(EventDispatcherResponse);
  });

  it('Throws handler error', async () => {
    expect(pizzaDispatcher.dispatch(new InvalidOrder())).rejects.toThrowError();
  });
});

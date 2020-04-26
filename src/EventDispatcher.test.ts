import EventDispatcherResponse from './EventDispatcherResponse';
import OrderPizza from './Mock/Event/OrderPizza';
import OrderSaved from './Mock/Event/OrderSaved';
import UnregisteredEvent from './Mock/Event/UnregisteredEvent';
import pizzaDispatcher from './Mock/pizzaDispatcher';
import VeggiePizza from './Mock/VeggiePizza';
import InvalidOrder from './Mock/Event/InvalidOrder';

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

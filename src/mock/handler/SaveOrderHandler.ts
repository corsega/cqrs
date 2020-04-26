import Context from '../../Context';
import OrderPizza from '../event/OrderPizza';
import OrderSaved from '../event/OrderSaved';

export default class SaveOrderHandler {
  public async handle(event: OrderPizza, { dispatch }: Context) {
    // persist order
    const order = {
      id: 'order-id',
      ...event,
    };

    // we can dispatch another event within this handler
    // which will trigger other event handlers
    await dispatch(new OrderSaved(order));

    return {
      order,
    };
  }
}

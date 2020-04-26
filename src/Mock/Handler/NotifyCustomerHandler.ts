import OrderPizza from '../Event/OrderPizza';

export default class NotifyCustomerHandler {
  public handle(event: OrderPizza) {
    return {
      notification: {
        id: 'notification-id',
        ...event,
      },
    };
  }
}

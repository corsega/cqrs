import OrderPizza from '../event/OrderPizza';

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

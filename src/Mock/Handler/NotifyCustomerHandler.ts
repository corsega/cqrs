import OrderPizza from '../Event/OrderPizza';

export default class NotifyCustomerHandler {
  public handle(event: OrderPizza) {
    return 'Send notification: Making pizza with ' + event.pizza.ingredients.join(', ');
  }
}

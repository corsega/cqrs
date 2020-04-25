import Context from '../../Context';
import OrderPizza from '../Event/OrderPizza';
import OrderSaved from '../Event/OrderSaved';

export default class SaveOrderHandler {
  public async handle(event: OrderPizza, context: Context) {
    const response = await context.dispatch(new OrderSaved(event.pizza));

    return 'Save the order: ' + JSON.stringify(response);
  }
}

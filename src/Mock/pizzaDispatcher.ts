import EventDispatcher from '../EventDispatcher';
import OrderPizza from './Event/OrderPizza';
import OrderSaved from './Event/OrderSaved';
import NotifyCustomerHandler from './Handler/NotifyCustomerHandler';
import SaveOrderHandler from './Handler/SaveOrderHandler';
import SendInvoice from './Handler/SendInvoiceHandler';

class PizzaDispatcher extends EventDispatcher {}

export default new PizzaDispatcher([
  {
    event: OrderPizza,
    handlers: [new SaveOrderHandler(), new NotifyCustomerHandler()],
  },
  {
    event: OrderSaved,
    handlers: [new SendInvoice()],
  },
]);

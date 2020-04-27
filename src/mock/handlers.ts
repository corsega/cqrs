import OrderPizza from './event/OrderPizza';
import SaveOrderHandler from './handler/SaveOrderHandler';
import NotifyCustomerHandler from './handler/NotifyCustomerHandler';
import SendInvoiceHandler from './handler/SendInvoiceHandler';
import InvalidOrderHandler from './handler/InvalidOrderHandler';
import OrderSaved from './event/OrderSaved';
import InvalidOrder from './event/InvalidOrder';

export default [
  {
    event: OrderPizza,
    handlers: [new SaveOrderHandler(), new NotifyCustomerHandler()],
  },
  {
    event: OrderSaved,
    handlers: [new SendInvoiceHandler()],
  },
  {
    event: InvalidOrder,
    handlers: [new InvalidOrderHandler()],
  },
];

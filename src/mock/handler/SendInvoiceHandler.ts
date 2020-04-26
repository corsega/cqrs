import OrderPizza from '../event/OrderPizza';

export default class SendInvoiceHandler {
  public handle(event: OrderPizza) {
    return {
      invoice: {
        id: 'invoice-id',
        ...event,
      },
    };
  }
}

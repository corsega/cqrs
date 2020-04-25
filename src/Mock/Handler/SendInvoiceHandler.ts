import OrderPizza from '../Event/OrderPizza';

export default class SendInvoice {
  public handle(event: OrderPizza) {
    return 'Send invoice ';
  }
}

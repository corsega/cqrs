
## TypeScript Class-Style Event Dispatcher

Define any class as an event.

```ts
class OrderPizza {
  constructor(public pizza: Pizza) {}
}
```

Define a event handler class. Must have a `handle` method with the following structure.

```ts
class SaveOrderHandler {
  public handle(event: OrderPizza) {
    // persist order
    const order = {
        id: 'order-uuid',
        pizza: event.pizza
    };
    return {
      order,
    };
  }
}
```

Register the event handlers.

```ts
const eventHandlerMap = [
  {
    event: OrderPizza,
    handlers: [
        new SaveOrderHandler(), 
        new SendNotificationHandler(),
    ],
  }
];

const dispatcher = new EventDispatcher(eventHandlerMap);
```

Dispatch the event

```ts
const orderPizza = new OrderPizza({
    size: 'large',
    ingredients: [
        'pepperoni', 
        'onions'
    ],
});

const response = await dispatcher.dispatch(orderPizza);

const orderId = response.order.id;
```

-------

Install
```
npm install
```

Test

```
npm run test
```

Build
```
npm run build

// or

npm run build:dev
```

Lint
```
npm run lint
```

Format
```
npm run format
```

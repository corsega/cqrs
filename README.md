
## TypeScript Class-Style Event Dispatcher

![coverage:branches](coverage/badge-branches.svg)
![coverage:functions](coverage/badge-functions.svg)
![coverage:lines](coverage/badge-lines.svg)
![coverage:statements](coverage/badge-statements.svg)

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

Register event handlers.

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

Dispatch an event.

```ts
const orderPizza = new OrderPizza({
    size: 'large',
    ingredients: [
        'pepperoni', 
        'onions'
    ],
});

const response = await dispatcher.dispatch(orderPizza);

// response will contain multiple responses from each handler
// indexed by each handler name
const orderId = response.SaveOrderHandler.order.id;
```

See `src/EventDispatcher.test.ts` for a more detailed example.

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

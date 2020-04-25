import Pizza from './Mock/Pizza';
import VeggiePizza from './Mock/VeggiePizza';
import Reflection from './Reflection';

describe('Reflection', () => {
  const reflection = new Reflection();

  it('Gets an instance class name', () => {
    const name = reflection.getClassName(
      new Pizza({
        ingredients: ['Salsa_Alfredo'],
      }),
    );

    expect(name).toBe('Pizza');
  });

  it('Gets an instance class name via getFullyQualifiedName()', () => {
    const name = reflection.getClassName(
      new VeggiePizza({
        ingredients: ['Tomatoes', 'Peppers', 'Onions'],
      }),
    );

    expect(name).toBe('VeggiePizzaWithTomatoesPeppersOnions');
  });

  it('Checks if to classes have the same name', () => {
    const isEqual = reflection.hasSameClassName(new Pizza(), new Pizza());

    expect(isEqual).toBe(true);
  });
});

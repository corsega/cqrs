import Pizza from './mock/Pizza';
import VeggiePizza from './mock/VeggiePizza';
import Reflection from './Reflection';

describe('Reflection', () => {
  const reflection = new Reflection();

  it('Gets an class name from instance', () => {
    const name = reflection.getClassName(new Pizza({ ingredients: [] }));

    expect(name).toBe('Pizza');
  });

  it('Gets a class name from class', () => {
    const name = reflection.getClassName(Pizza);

    expect(name).toBe('Pizza');
  });

  it('Returns null when no class name is found', () => {
    const name = reflection.getClassName({});

    expect(name).toBeNull();
  });

  it('Gets an instance class name via getFullyQualifiedName()', () => {
    const name = reflection.getClassName(
      new VeggiePizza({
        ingredients: ['Tomatoes', 'Peppers', 'Onions'],
      }),
    );

    expect(name).toBe('VeggiePizzaWithTomatoesPeppersOnions');
  });

  it('Checks if two classes have the same name', () => {
    expect(reflection.hasSameClassName(new Pizza(), new Pizza())).toBe(true);
  });
});

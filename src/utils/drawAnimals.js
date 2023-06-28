export function drawAnimals(animals, quantity) {
  if (quantity > animals.length) {
    return [];
  }

  const drawnAnimals = [];

  while (drawnAnimals.length < quantity) {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const drawnAnimal = animals[randomIndex];

    if (!drawnAnimals.includes(drawnAnimal)) {
      drawnAnimals.push(drawnAnimal);
    }
  }

  return drawnAnimals;
}

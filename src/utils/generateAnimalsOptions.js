export function generateAnimalsOptions(name, array) {
  const animals = [];

  while (animals.length < 3) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomAnimal = array[randomIndex];

    if (!animals.includes(randomAnimal) && randomAnimal !== name) {
      animals.push(randomAnimal);
    }
  }

  const randomPosition = Math.floor(Math.random() * 3);
  animals[randomPosition] = name;

  return animals;
}
const useApi = () => {
  const getTeachers = async () => {
    const response = await fetch('https://apifaunasnapshot.vercel.app/teacher')
    const data = await response.json()

    return data
  }

  const getTeacherAnimals = async (username) => {
    const response = await fetch(`https://apifaunasnapshot.vercel.app/animal/${username}`)
    const data = await response.json()

    return data
  }

  const updateTeacherAnimal = async (username, animal, state) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: animal, state }),
    }
    const response = await fetch(`https://apifaunasnapshot.vercel.app/animal/${username}`, requestOptions)
    const data = await response.json()

    return data;
  }

  const getClassRoomAttempts = async (username) => {
    const response = await fetch(`https://apifaunasnapshot.vercel.app/attempt/teacher/${username}`)
    const data = await response.json()
    return data
  }

  return {
    getTeachers,
    getTeacherAnimals,
    updateTeacherAnimal,
    getClassRoomAttempts
  }
}

export default useApi

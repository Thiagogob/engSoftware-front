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

    return {
        getTeachers,
        getTeacherAnimals
    }
}

export default useApi

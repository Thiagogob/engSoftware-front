const useApi = () => {
    const getTeachers = async () => {
        const response = await fetch('https://apifaunasnapshot.vercel.app/teacher')
        const data = await response.json()

        return data
    }

    return {
        getTeachers
    }
}

export default useApi

import { useContext, useEffect, useRef } from "react"
import { AnimalsContext } from "../contexts/animals"
import { useCookies } from "./useCookies"

const api = 'https://apifaunasnapshot.onrender.com'
// const api = 'http://localhost:8000'

export const useAnimals = () => {
  const { animals, setAnimals, apiCall, setApiCall } = useContext(AnimalsContext)
  const { getCookie } = useCookies()

  useEffect(() => {
    if (!apiCall)
      (async function () {
        !!(await getCookie('authstudent')) ? fetchTeacherAnimals() : fetchStandardAnimals()
        setApiCall(true)
      })()
  }, [])

  async function fetchStandardAnimals() {
    const response = await fetch(`${api}/animal`)
    const data = await response.json()
    setAnimals(data)
  }

  async function fetchTeacherAnimals() {
    const { teacherUser } = await getCookie('user')
    const response = await fetch(`${api}/animal/selected/${teacherUser}`)
    const data = await response.json()
    setAnimals(data)
  }

  return {
    animals: [...animals],
    fetchTeacherAnimals
  }
}
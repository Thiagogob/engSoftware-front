import { useContext, useEffect, useRef } from "react"
import { AnimalsContext } from "../contexts/animals"
import { useCookies } from "./useCookies"

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
    const response = await fetch('https://apifaunasnapshot.vercel.app/animal')
    const data = await response.json()
    setAnimals(data)
  }

  async function fetchTeacherAnimals() {
    const { teacherUser } = await getCookie('user')
    const response = await fetch(`https://apifaunasnapshot.vercel.app/animal/selected/${teacherUser}`)
    const data = await response.json()
    setAnimals(data)
  }

  return {
    animals: [...animals],
    fetchTeacherAnimals
  }
}
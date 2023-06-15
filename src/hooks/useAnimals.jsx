import { useContext, useEffect } from "react"
import { useAuth } from "./useAuth"
import { AnimalsContext } from "../contexts/animals"
import { useCookies } from "./useCookies"

export const useAnimals = () => {
  const { animals, setAnimals, apiCall, setApiCall } = useContext(AnimalsContext)
  const { authUser } = useAuth()
  const { getCookie } = useCookies()

  useEffect(() => {

    if (!apiCall)
      (async function () {
        getCookie('authstudent') ? fetchTeacherAnimals() : fetchStandardAnimals()
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
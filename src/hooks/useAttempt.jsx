import { useContext } from "react"
import { AttemptContext } from "../contexts/attempt"

// interface IAttempt {
//   phaseOne: { animal: string, isCorrect: boolean }
//   phaseTwo: { animal: string, isCorrect: boolean }
// }

const useAttempt = () => {
  const attempt = useContext(AttemptContext)

  const pushItem = (phase, animal, isCorrect) => {
    attempt[phase].push({ animal, isCorrect })
  }

  const getAttempt = () => {
    return [...attempt]
  }

  return {
    pushItem,
    getAttempt
  }
}
import { createContext } from 'react'

export const AttemptContext = createContext()

export const AttemptProvider = ({ children }) => {
  const attempt = []

  return <AttemptContext.Provider value={attempt}>{children}</AttemptContext.Provider>
}

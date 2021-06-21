import { createContext } from 'react'
export const MaskContext = createContext([])
export const LanguageContext= createContext(
    {
        language: "en",
        setLanguage: () => { }
    }
)

export const Openoverlay = createContext()
// set the defaults

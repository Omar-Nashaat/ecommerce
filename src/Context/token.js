import { createContext, useState } from "react";
import React from 'react'


export const tokenContext = createContext();


export default function TokenContextProvider({ children }) {

    const [token, setToken] = useState(null)

    return <tokenContext.Provider value={{ token, setToken }}>
        {children}
    </tokenContext.Provider>
}

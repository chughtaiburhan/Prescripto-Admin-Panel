import { createContext } from "react";

export const DoctorContext=createContext();
const DoctorContextProvider=(prop) =>{
    const value={

    }
    return (
        <DoctorContext.Provider value={value}>
            {prop.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
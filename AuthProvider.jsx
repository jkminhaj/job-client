import { createContext } from "react";

// Exporting 
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    
    // Start declaring variables from here
    const testing = 'Hello world'



    // Pass data from here !!
    const data = {
        testing
    }

    // Main part
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
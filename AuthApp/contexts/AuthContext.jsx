import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [loggerInUser, setLoggedInUser] = React.useState(null);

    return(
        <AuthContext.Provider value = {{loggerInUser, setLoggedInUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
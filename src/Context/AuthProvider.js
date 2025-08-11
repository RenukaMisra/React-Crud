import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    
    console.log(user,"Userrr")

    const secureLogin = (email, password) => {
      const allowedUsers = [
        { email: "renuka6@gmail.com", password:"1234"},
        { email: "rinshitha95@gmail.com", password:"abcd"},
        { email: "user@gmail.com", password:"8714"}
      ]

      const matchedUser = allowedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser){
        setUser(email);
        localStorage.setItem("email",email);
      }else{
        toast.error ("Invalid User",
          {
            postion:"top-center", autoClose: 3000
          }
        );
      }
      };

      const login = (email,password) =>{
              console.log(email, password,"ready")
        window.localStorage.setItem("email", email)
        setUser(email)
      }
      
    

     const logout = (email,password) => {
      console.log(email,password,"Logging out...")
      window.localStorage.removeItem("email",email)
      setUser(null)
       }

  return (
     <AuthContext.Provider value={{ login, user, logout, secureLogin }}>
    {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
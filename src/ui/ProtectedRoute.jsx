import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {

    const navigate = useNavigate();
  //1.Load the authenticated user
  const { isLoading ,isAuthenticated} = useUser();
 
  //2.if there is no authenticated user redirect to the login
useEffect(function(){
    if(!isLoading && !isAuthenticated){
        navigate("/login");
    }
},[isAuthenticated, isLoading, navigate])

 //3.While Loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );


  //4. If there is an authenticated user rander the app

  if(isAuthenticated) return children;
}

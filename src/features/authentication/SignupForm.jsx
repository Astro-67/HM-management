import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "./useSignup";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 0.8rem;
  position: relative;
  width: 100%;

  &:last-child {
    padding-bottom: 0;
  }

  label {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.8rem;
`;

const ErrorMessage = styled.span`
  position: absolute;
  right: 0;
  top: 0.3rem;
  font-size: 1.1rem;
  color: var(--color-red-700);
  background-color: var(--color-grey-0);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  z-index: 10;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);
  white-space: nowrap;
`;

const FormHeading = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 140rem;
  padding: 1.2rem 2rem;
  margin: 0;

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

const StyledInput = styled(Input)`
  font-size: 1.3rem;
  padding: 0.6rem;
  height: 3rem;
`;

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({});
  
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();

  function validateForm() {
    const newErrors = {};
    
    if (!fullName) newErrors.fullName = "Full name is required";
    
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) 
      newErrors.email = "Please enter a valid email address";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) 
      newErrors.password = "Password must be at least 8 characters";
    
    if (!passwordConfirm) newErrors.passwordConfirm = "Please confirm your password";
    else if (passwordConfirm !== password) 
      newErrors.passwordConfirm = "Passwords do not match";
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Call the signup function from the hook
    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          // Clear form after successful signup
          setFullName("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setError({});
        }
      }
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormRow>
        <label htmlFor="fullName">Full name</label>
        <InputContainer>
          <StyledInput
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
          {error.fullName && <ErrorMessage>{error.fullName}</ErrorMessage>}
        </InputContainer>
      </StyledFormRow>

      <StyledFormRow>
        <label htmlFor="email">Email address</label>
        <InputContainer>
          <StyledInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
        </InputContainer>
      </StyledFormRow>

      <StyledFormRow>
        <label htmlFor="password">Password (min 8 characters)</label>
        <InputContainer>
          <StyledInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
        </InputContainer>
      </StyledFormRow>

      <StyledFormRow>
        <label htmlFor="passwordConfirm">Repeat password</label>
        <InputContainer>
          <StyledInput
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={isLoading}
          />
          {error.passwordConfirm && <ErrorMessage>{error.passwordConfirm}</ErrorMessage>}
        </InputContainer>
      </StyledFormRow>

      <ButtonContainer>
        <Button 
          type="reset" 
          variation="secondary" 
          disabled={isLoading}
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
        <Button 
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </ButtonContainer>
    </StyledForm>
  );
}

export default SignupForm;
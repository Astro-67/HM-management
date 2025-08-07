// filepath: /home/astro/ReactProject/HM-System/src/features/authentication/LoginForm.jsx
import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledForm = styled(Form)`
  padding: 0;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
`;

const LoginFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-bottom: 1.2rem;

  &:last-child {
    padding-bottom: 0;
  }

  label {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const StyledFormButton = styled.div`
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.5rem;
  font-weight: 500;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
    background-color: var(--color-brand-600);
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LoginFormRow>
        <label htmlFor="email">Email address</label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="your@email.com"
          style={{ width: "100%", fontSize: "1.5rem", padding: "0.8rem" }}
        />
      </LoginFormRow>

      <LoginFormRow>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="••••••••"
          style={{ width: "100%", fontSize: "1.5rem", padding: "0.8rem" }}
        />
      </LoginFormRow>

      <StyledFormButton>
        <LoginButton variation="primary" size="medium" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </LoginButton>
      </StyledFormButton>
    </StyledForm>
  );
}

export default LoginForm;

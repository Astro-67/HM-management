import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  background-color: var(--color-grey-50);
  padding: 2rem;
`;

const Container = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem 2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
`;

export default function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h3" style={{ textAlign: "center", marginBottom: "1.2rem", color: "var(--color-grey-700)" }}>
        Log in to your account
      </Heading>
      <Container>
        <LoginForm />
      </Container>
    </LoginLayout>
  )
}

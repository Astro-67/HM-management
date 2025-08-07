import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const FormContainer = styled.div`
  max-width: 140rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  width: 100%;
`;

const PageContainer = styled.div`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default function NewUsers() {
  return (
    <>
     <Heading as="h1">Create a new User</Heading>
    <PageContainer>
     

      <FormContainer>
        <SignupForm />
      </FormContainer>
    </PageContainer>
    </>
  );
}

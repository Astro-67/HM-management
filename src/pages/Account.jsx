import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 96rem;
`;

const FormSection = styled.div`
  /* Add some padding between the heading and form */
  & > h3 {
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

export default function Account() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Account Settings</Heading>
      </Row>

      <StyledAccount>
        <FormSection>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        </FormSection>
        
        <FormSection>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </FormSection>
      </StyledAccount>
    </>
  );
}

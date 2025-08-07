// filepath: /home/astro/ReactProject/HM-System/src/features/authentication/UpdatePasswordForm.jsx
import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdatePassword } from "./useUpdatePassword";

const StyledForm = styled(Form)`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

const ErrorMessage = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const { updatePassword, isUpdating } = useUpdatePassword();
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (!password) {
      setError("Password is required");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    
    updatePassword(
      { password },
      {
        onSettled: () => {
          setPassword("");
          setPasswordConfirm("");
          setError("");
        },
      }
    );
  }
  
  function handleCancel() {
    setPassword("");
    setPasswordConfirm("");
    setError("");
  }
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow
        label="New password (min 8 characters)"
        error={error && error}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      
      <FormRow label="Confirm password">
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </StyledForm>
  );
}

export default UpdatePasswordForm;
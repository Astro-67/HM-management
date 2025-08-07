// filepath: /home/astro/ReactProject/HM-System/src/features/authentication/UpdateUserDataForm.jsx
import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

const StyledForm = styled(Form)`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [avatar, setAvatar] = useState(null);
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (!fullName) return;
    
    updateUser(
      { fullName, avatar: avatar || undefined },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }
  
  function handleCancel() {
    setFullName(user?.user_metadata?.full_name || "");
    setAvatar(null);
  }
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="fullName"
        />
      </FormRow>
      
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
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
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </StyledForm>
  );
}

export default UpdateUserDataForm;
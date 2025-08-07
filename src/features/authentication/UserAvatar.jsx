// filepath: /home/astro/ReactProject/HM-System/src/features/authentication/UserAvatar.jsx
import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  
  if (!user) return null;

  const { full_name: fullName, avatar } = user.user_metadata || {};
  
  // Add a key to force re-render when the avatar URL changes
  return (
    <StyledUserAvatar>
      <Avatar 
        src={avatar || "/avatar-default.svg"} 
        alt={`Avatar for ${fullName}`}
        key={avatar} // Add key to force re-render when avatar changes
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
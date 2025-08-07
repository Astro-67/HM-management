// filepath: /home/astro/ReactProject/HM-System/src/features/authentication/Logout.jsx
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading} title="Logout">
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
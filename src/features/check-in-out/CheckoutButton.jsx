import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useCheckout } from "./UseCheckInOut";
import SpinnerMini from "../../ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  function handleCheckout() {
    checkout(bookingId);
  }

  return (
    <Button 
      size="small" 
      variation="primary" 
      onClick={handleCheckout}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? (
        <SpinnerMini />
      ) : (
        <>
          <HiArrowLeftOnRectangle /> Check out
        </>
      )}
    </Button>
  );
}

export default CheckoutButton;

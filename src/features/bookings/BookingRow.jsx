import styled from "styled-components";
import { format } from "date-fns";
import {
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiEye,
  HiTrash
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckout } from "../check-in-out/UseCheckInOut";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    cabins,
    guests
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabins?.name || "Unknown cabin"}</Cabin>

        <Stacked>
          <span>{guests?.fullName || "Unknown guest"}</span>
          <span>{guests?.email || "No email provided"}</span>
        </Stacked>

        <Stacked>
          <span>
            {startDate ? format(new Date(startDate), "MMM dd yyyy") : "N/A"} &rarr;{" "}
            {endDate ? format(new Date(endDate), "MMM dd yyyy") : "N/A"}
          </span>
          <span>{numNights} nights</span>
        </Stacked>

        <Tag type={statusToTagName[status]}>
          {status.replace("-", " ")}
        </Tag>

        <Amount>${totalPrice}</Amount>

        <div>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => {
                    if (confirm("Do you want to check out this booking?")) {
                      checkout(bookingId);
                    }
                  }}
                  disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </div>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
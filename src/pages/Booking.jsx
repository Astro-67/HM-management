import BookingTable from '../features/bookings/BookingTable'
import BookingTableOperation from '../features/bookings/BookingTableOperation'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

export default function Booking() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperation />
      </Row>
      <BookingTable />
    </>
  )
}

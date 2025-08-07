import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from '../features/cabins/AddCabin'
import CabinTableOperation from '../features/cabins/CabinTableOperation'

export default function Cabins() {
 
   
  return (
   <>
   <Row type="horizontal">
    <Heading as="h1">All Cabins</Heading>
    <CabinTableOperation />
   </Row>
   <Row type="vertical">
    <CabinTable/>
    <AddCabin/>
    
   </Row>

   </>
  )
}

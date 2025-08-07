import { useState } from "react";
import styled from "styled-components";
import { HiArrowUpTray } from "react-icons/hi2";
import toast from "react-hot-toast";

import supabase from "../services/supabase";
import guests from "./guests";
import cabins from "./cabins";
import bookings from "./bookings";
import Button from "../ui/Button";

const StyledDataUploader = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  margin-top: auto;
  text-align: center;

  .heading {
    margin-bottom: 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
`;

async function uploadData(data, table) {
  // Filter the data based on which table we're working with
  let filteredData = data;
  
  // Filter out properties that don't exist in the guests table
  if (table === 'guests') {
    filteredData = data.map(item => ({
      fullName: item.fullName,
      email: item.email,
      nationalID: item.nationalID,
      nationality: item.nationality,
      countryFlag: item.countryFlag
      // phone is omitted since it doesn't exist in the database
    }));
  } else if (table === 'cabins') {
    filteredData = data.map(item => ({
      name: item.name,
      maxCapacity: item.maxCapacity,
      regularPrice: item.regularPrice,
      discount: item.discount,
      description: item.description,
      image: item.image
    }));
  } else if (table === 'bookings') {
    filteredData = data.map(item => ({
      startDate: item.startDate,
      endDate: item.endDate,
      numNights: item.numNights,
      numGuests: item.numGuests,
      cabinId: item.cabinId,
      guestId: item.guestId,
      cabinPrice: item.cabinPrice || item.totalPrice * 0.8, // Fallback if cabinPrice is missing
      extrasPrice: item.extrasPrice || item.totalPrice * 0.2, // Fallback if extrasPrice is missing
      totalPrice: item.totalPrice,
      status: item.status || 'unconfirmed',
      hasBreakfast: item.hasBreakfast || false,
      isPaid: item.isPaid || false,
      observation: item.observation || item.observations || null // Handle both singular and plural
    }));
  }
  
  try {
    const { data: insertedData, error } = await supabase
      .from(table)
      .insert(filteredData)
      .select();
      
    if (error) {
      console.error(`Error uploading ${table}:`, error);
      throw new Error(`Error uploading ${table}: ${error.message}`);
    }
    return insertedData;
  } catch (err) {
    console.error(`Failed to insert into ${table}:`, err);
    console.error('Data that caused the error:', JSON.stringify(filteredData, null, 2));
    throw err;
  }
}

function DataUploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUploadAll() {
    setIsLoading(true);

    try {
      // 1. Upload guests
      const insertedGuests = await uploadData(guests, "guests");
      console.log(`${insertedGuests?.length || 0} guests uploaded successfully`);
      
      // 2. Upload cabins
      const insertedCabins = await uploadData(cabins, "cabins");
      console.log(`${insertedCabins?.length || 0} cabins uploaded successfully`);
      
      // Get the newly uploaded cabin IDs
      const { data: availableCabins } = await supabase
        .from('cabins')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(insertedCabins.length);
      
      if (!availableCabins || availableCabins.length === 0) {
        throw new Error("Failed to retrieve uploaded cabins. Cannot continue with bookings upload.");
      }
      
      // 3. Map booking cabin IDs to the newly inserted cabin IDs
      const modifiedBookings = bookings.map((booking, index) => {
        // Use modulo to ensure we're always picking an existing cabin ID
        const cabinIndex = index % availableCabins.length;
        return {
          ...booking,
          cabinId: availableCabins[cabinIndex].id
        };
      });
      
      // 4. Upload bookings with corrected cabin IDs
      const insertedBookings = await uploadData(modifiedBookings, "bookings");
      console.log(`${insertedBookings?.length || 0} bookings uploaded successfully`);
      
      toast.success("All data successfully uploaded!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUploadCabins() {
    setIsLoading(true);
    
    try {
      const insertedCabins = await uploadData(cabins, "cabins");
      console.log(`${insertedCabins?.length || 0} cabins uploaded successfully`);
      toast.success("Cabin data successfully uploaded!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function handleUploadBookings() {
    setIsLoading(true);
    
    try {
      // First ensure guests exist
      const insertedGuests = await uploadData(guests, "guests");
      console.log(`${insertedGuests?.length || 0} guests uploaded successfully`);
      
      // Get available cabin IDs from the database
      const { data: availableCabins } = await supabase
        .from('cabins')
        .select('id')
        .order('id', { ascending: true });
      
      if (!availableCabins || availableCabins.length === 0) {
        throw new Error("No cabins found in database. Please upload cabins first.");
      }
      
      console.log(`Found ${availableCabins.length} cabins in database`);
      
      // Map booking cabin IDs to existing cabin IDs
      const modifiedBookings = bookings.map((booking, index) => {
        // Use modulo to ensure we're always picking an existing cabin ID
        const cabinIndex = index % availableCabins.length;
        return {
          ...booking,
          cabinId: availableCabins[cabinIndex].id
        };
      });
      
      // Then upload bookings with corrected cabin IDs
      const insertedBookings = await uploadData(modifiedBookings, "bookings");
      console.log(`${insertedBookings?.length || 0} bookings uploaded successfully`);
      
      toast.success("Booking data successfully uploaded!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledDataUploader>
      <p className="heading">Development Data</p>
      
      <div className="buttons">
        <Button 
          size="small" 
          onClick={handleUploadCabins} 
          disabled={isLoading}
        >
          <HiArrowUpTray /> Upload Cabins
        </Button>
        
        <Button 
          size="small" 
          onClick={handleUploadBookings} 
          disabled={isLoading}
          variation="secondary"
        >
          <HiArrowUpTray /> Upload Bookings
        </Button>
        
        <Button 
          size="small" 
          onClick={handleUploadAll} 
          disabled={isLoading}
          variation="primary"
        >
          <HiArrowUpTray /> Upload All Data
        </Button>
      </div>
      
      <p style={{ fontSize: "1.2rem", color: "var(--color-grey-500)" }}>
        Only for development
      </p>
    </StyledDataUploader>
  );
}

export default DataUploader;
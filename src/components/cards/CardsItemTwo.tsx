import Link from "next/link";
import Image from "next/image";
import { CardItemProps } from "@/types/cards";
import React from "react";

const CardsItemTwo: React.FC<CardItemProps> = ({
  eventImageSrc,
  eventTitle,
  eventDate,
}) => {
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <Link href="#" className="block px-4 pt-4">
        <Image width={432} height={238} src={eventImageSrc || ""} alt="Cards" />
      </Link>

      <div className="p-6">
        <h4 className="mb-3 text-l font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary">
          <Link href="#">{eventTitle}</Link>
        </h4>
        <div class="flex">
          <div class="flex-none w-7">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
          </div>
          <div class="grow">
            <p class="text-sm"> {eventDate}</p>
          </div>

        </div> 
        
  
         
      </div>
    </div>
  );
};

export default CardsItemTwo;

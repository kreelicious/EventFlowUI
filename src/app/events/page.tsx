import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/EventBreadcrumb";
import CardsItemTwo from "@/components/cards/CardsItemTwo";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "EventFlow - Events",
  description:
    "",
};



const cardsItemTwoData = [
  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "A Tribute To Prince",
    eventDate:
      "Friday, 12th may 2024",
  },

  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "WALES V IRELAND WITH MUSIC FROM COLDSHOT",
    eventDate:
      "Friday, 12th may 2024",
  },

  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "Next.js Card Title here",
    eventDate:
      "Friday, 12th may 2024",
  },
];

const Events: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />


      <div className="grid grid-cols-2 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
        {cardsItemTwoData.map((event, key) => (
          <CardsItemTwo
            key={key}
           eventImageSrc={event.eventImageSrc}
            eventTitle={event.eventTitle}
            eventDate={event.eventDate}
          />
        ))}
      </div>

    </DefaultLayout>
  );
};

export default Events;

import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/EventBreadcrumb";
import CardsItemTwo from "@/components/cards/CardsItemTwo";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "EventFlow - Events",
  description: "",
};

const cardsItemTwoData = [
  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "A Tribute To Prince",
    eventDate: "Friday, 12th may 2024",
  },

  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "WALES V IRELAND WITH MUSIC FROM COLDSHOT",
    eventDate: "Friday, 12th may 2024",
  },

  {
    eventImageSrc: "/images/cards/cards-04.png",
    eventTitle: "Next.js Card Title here",
    eventDate: "Friday, 12th may 2024",
  },
];

const fetchEvents = async () => {
  const resp = await directus().request<Event[]>(readItems("events"));
  console.log(resp);
  if (!resp) {
    throw new Error("Failed to fetch data");
  }
  return resp;
};

const EventListing: React.FC = async () => {
  let events: Event[] = [];

  try {
    events = await fetchEvents();
  } catch (error) {
    console.error(error);
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />

      {events.map((event) => (
        <div key={event.id}>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>
      ))}

      {/* <div className="grid grid-cols-2 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
        {cardsItemTwoData.map((event, key) => (
          <CardsItemTwo
            key={key}
           eventImageSrc={event.eventImageSrc}
            eventTitle={event.eventTitle}
            eventDate={event.eventDate}
          />
        ))}
      </div> */}
    </DefaultLayout>
  );
};

export default EventListing;

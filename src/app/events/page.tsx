'use client';
import React, { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/EventBreadcrumb";
import CardsItemTwo from "@/components/cards/CardsItemTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Event } from "@/types/event";
import useAxiosAuth from "@/hooks/useAxiosAuth";

// export const metadata: Metadata = {
//   title: "EventFlow - Events",
//   description: "",
// };

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

const EventListing: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const resp = await axiosAuth.get(`/api/v1/events`);
      setEvents(resp.data);
    }catch(e: any) {
      console.log(e.message);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />
      <button className="rounded-md bg-secondary px-9 py-3 font-medium text-white" onClick={fetchEvents}>Fetch Events</button>
      <hr />
      { events && JSON.stringify(events) }

      {/* {events.map((event) => (
        <div key={event.id}>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>
      ))} */}

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

import { Metadata } from "next";
import { LocationDetailClient } from "./location-detail-client";
import dataPlace from "@/data/dataPlace.json";
import { Location } from "@/types/location";

const locations: Location[] = dataPlace as unknown as Location[];

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you would fetch the location data here
  const location = locations.find((loc) => loc.slug === params.slug);

  if (!location) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    };
  }

  return {
    title: `${location.name} - ${location.city}, ${location.country}`,
  };
}
export default async function LocationPage({ params }: Props) {
  const location = locations.find((loc) => loc.slug === params.slug);

  if (!location) {
    return <div>Location not found</div>;
  }

  return <LocationDetailClient location={location} />;
}

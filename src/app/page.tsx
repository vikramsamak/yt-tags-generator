import Headings from "@/components/Headings";
import TagSearch from "@/components/TagSearch";
import { APP_DETAILS } from "@/constants/Constants";

export default function Home() {
  return (
    <main className="flex flex-grow h-full w-full p-4 items-start md:items-center justify-center">
      <section className="flex flex-col gap-8 p-2 w-full">
        <Headings
          heading={APP_DETAILS.heading}
          subHeading={APP_DETAILS.subHeading}
        />
        <TagSearch />
      </section>
    </main>
  );
}

import Headings from "@/components/Headings";
import TagSearch from "@/components/TagSearch";
import { APP_DETAILS } from "@/constants/Constants";

function TagGenerator() {
  return (
    <div className="flex flex-col gap-8 p-2 w-full">
      <Headings
        heading={APP_DETAILS.heading}
        subHeading={APP_DETAILS.subHeading}
      />
      <TagSearch />
    </div>
  );
}

export default TagGenerator;

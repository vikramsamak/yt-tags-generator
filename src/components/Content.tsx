import { rapidTagsContent } from "@/constants/Content";
import type { Content } from "@/types/Types";

function Content() {
  return (
    <section className="container mx-auto flex flex-col gap-4">
      {rapidTagsContent.map((item: Content, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="mt-2 text-justify text-pretty">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Content;

import Content from "@/components/Content";
import TagGenerator from "@/components/Taggenerator";

export default function Home() {
  return (
    
    <main className="flex flex-col gap-2">
      <section className="flex h-screen justify-center items-center px-8">
        <TagGenerator />
      </section>
      <Content />
    </main>
 
  );
}

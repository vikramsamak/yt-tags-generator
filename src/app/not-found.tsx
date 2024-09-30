import Headings from "@/components/Headings";

export default function NotFound() {
  return (
    <main className="flex flex-grow h-full w-full p-4 items-start md:items-center justify-center">
      <section className="flex gap-8 p-2 w-full">
        <Headings heading={"Page Not Found!"} />
      </section>
    </main>
  );
}

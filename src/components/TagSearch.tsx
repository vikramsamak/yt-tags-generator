"use client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TagSearch() {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center">
      <Input
        className="w-full md:w-1/2 p-6"
        placeholder="Enter your next youtube video title to generate tags"
      />
      <Button
        className="w-full p-6 inline-flex gap-2 md:w-1/6"
        variant="outline"
      >
        <Search className="h-4 w-5" />
        Search
      </Button>
    </div>
  );
}

export default TagSearch;

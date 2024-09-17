import { ThemeToogle } from "./ThemeToggle";

function Header() {
  return (
    <header className="flex p-4 w-full h-12 justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">
        RapidTags
      </h1>
      <ThemeToogle />
    </header>
  );
}

export default Header;

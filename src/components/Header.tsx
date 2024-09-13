import { ThemeToogle } from "./ThemeToggle";

function Header() {
  return (
    <header className="flex p-4 w-full h-12 justify-between">
      Header <ThemeToogle />
    </header>
  );
}

export default Header;

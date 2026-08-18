import { Search } from "lucide-react";
import { ReactNode } from "react";
import { Header } from "@/components/ui/header";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/messages", label: "Messages" },
  { href: "/contacts", label: "Contacts" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell">
      <Header
        brand="Yathu SMS"
        mark="Y"
        navigation={navigation}
        actions={
          <>
            <button className="icon-button" type="button" aria-label="Search">
              <Search aria-hidden="true" className="icon" />
            </button>
            <ThemeToggle />
            <div className="avatar" aria-label="Olivia Rhye">
              OR
            </div>
          </>
        }
      />
      {children}
    </main>
  );
}

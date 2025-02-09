"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 md:px-8">
          <Link href="/dashboard" className="mr-8 text-xl font-bold">
            Statix
          </Link>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}

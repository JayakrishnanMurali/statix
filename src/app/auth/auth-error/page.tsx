import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            There was a problem with the authentication process. Please try
            again.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/login">
            <Button>Return to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";

import { useRouter } from "@/hooks";

export default function AuthGard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/") router.replace("/login");
  }, [router]);
  return <>{children}</>;
}

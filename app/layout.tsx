import type { Metadata } from "next";

export const metadata: Metadata = { title: "Senarai Tugas", description: "Aplikasi to-do list ringkas dan kemas." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ms"><body>{children}</body></html>;
}

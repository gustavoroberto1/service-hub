'use client'

import { usePathname } from "next/navigation";



export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  return <div>
    {pathname === "/cliente" ? "Página de Clientes" : pathname === '/dashaboard' ? "Página de Dashaboard" : "Página de Atendimento"}
    {children}
  </div>;
}

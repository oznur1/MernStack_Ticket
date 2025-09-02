
import { House, Ticket, Plus, Users, Mail, ChartArea } from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Yeni Ticket",
    href: "/ticket/add",
    icon: Plus,
  },
  {
    label: "Takımlar",
    href: "#",
    icon: Users,
  },
  {
    label: "Gelen Kutusu",
    href: "#",
    icon: Mail,
  },
  {
    label: "İstatistikler",
    href: "#",
    icon: ChartArea,
  },
];

export const DATE_FORMATS = {
  display: {
    day: "2-digit" as const,
    month: "long" as const,
    year: "numeric" as const,
  },
  short: {
    day: "2-digit" as const,
    month: "short" as const,
    year: "numeric" as const,
  },
};

export const STATUS_COLORS = {
  Beklemede: "bg-yellow-500",
  "Devam Ediyor": "bg-blue-500",
  Çözüldü: "bg-green-500",
};



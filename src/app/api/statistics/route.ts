import connectMongo from "@/utils/connect_mongo";
import Ticket from "../models/ticket";
import { NextResponse as Res } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const tickets = await Ticket.find();

    const totalTickets = tickets.length;

    // kategoriye göre dağılım
    const ticketsByCategory = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // statüye göre dağılım (sabit keylerle)
    const ticketsByStatus: Record<"Beklemede" | "Devam Ediyor" | "Çözüldü", number> = {
      Beklemede: 0,
      "Devam Ediyor": 0,
      "Çözüldü": 0,
    };

    tickets.forEach((ticket) => {
      if (ticketsByStatus.hasOwnProperty(ticket.status)) {
        ticketsByStatus[ticket.status as keyof typeof ticketsByStatus]++;
      }
    });

    // çözüm oranı
    const completedTickets = ticketsByStatus["Çözüldü"];
    const completionRate =
      totalTickets > 0 ? Number(((completedTickets / totalTickets) * 100).toFixed(1)) : 0;

    // kritik önelikli ticketlar
    const criticalTickets = tickets.filter((ticket) => ticket.priority >= 4).length;

    // tarih hesaplamaları
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    const ticketsCreatedToday = tickets.filter((t) => new Date(t.createdAt) >= today).length;
    const ticketsCreatedThisWeek = tickets.filter((t) => new Date(t.createdAt) >= thisWeek).length;
    const ticketsCreatedThisMonth = tickets.filter((t) => new Date(t.createdAt) >= thisMonth).length;
    const ticketsCreatedThisYear = tickets.filter((t) => new Date(t.createdAt) >= thisYear).length;

    // ortalama öncelik
    const averagePriority =
      totalTickets > 0
        ? Number((tickets.reduce((acc, t) => acc + t.priority, 0) / totalTickets).toFixed(1))
        : 0;

    return Res.json({
      totalTickets,
      ticketsByCategory,
      ticketsByStatus,
      completionRate,
      criticalTickets,
      ticketsCreatedToday,
      ticketsCreatedThisWeek,
      ticketsCreatedThisMonth,
      ticketsCreatedThisYear,
      averagePriority,
    });
  } catch (error) {
    console.error("Statistics API Error:", error);
    return Res.json({ message: "Bir sorun oluştu" }, { status: 500 });
  }
}

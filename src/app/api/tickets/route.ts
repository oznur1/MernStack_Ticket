import connectMongo from "@/utils/connect_mongo";
import mongoose from "mongoose";
import { NextResponse as Res } from "next/server";
import Ticket from "../models/ticket";



// Get isteklerine cevap veren endpoint:
export async function  GET() {

try {
    //veritabanına bağlan
    await connectMongo()

  // ticket verilerini al
    const tickets = await Ticket.find();

    return Res.json({
    message:"Ticket verileri alındı",
         tickets,
    })

}catch(error){
    return Res.json({
        message:"Ticket verileri alınırken bir sorun oluştu",
        error: (error instanceof Error && error.message) || "Bilinmeyen hata!",
   },
   {status:500}
)
}}


// Post isteklerine cevap veren endpoint:
export async function  POST(req:Request) {
      
   try {
    //veritabanına bağlan
    await connectMongo()

    //isteği body kısmındaki veriyi al
      const body=await req.json()

     //veritabanına yeni ticket'ı kaydet
      const newTicket=await Ticket.create(body);

    return Res.json({
    message:"Ticket oluşturuldu",
    })

}catch(error: any){
    return Res.json({
        message:"Ticket verileri oluşturulurken  bir sorun oluştu",
        error: (error instanceof Error && error.message) || "Bilinmeyen hata!",
   },
   {status:500}
)

}}



import mongoose, { Schema, Document } from "mongoose";

// veri tipi tanımla
export interface ITicket extends Document {
  title: string;
  description: string;
  category: "Yazılım Sorunu" | "Donanım Sorunu" | "Bağlantı Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
}

// ticket verisi için bir şema oluştur
const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
    },
    description: {
      type: String,
      required: [true, "description alanı zorunludur"],
    },
    category: {
      type: String,
      enum: ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu", "Diğer"],
      required: [true, "category alanı zorunludur"],
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "priority alanı zorunludur"],
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, "progress alanı zorunludur"],
    },
    status: {
      type: String,
      enum: ["Beklemede", "Devam Ediyor", "Çözüldü"],
      required: [true, "status alanı zorunludur"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret._id; 
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// eğer daha önce Ticket modeli oluşturulduysa onu al yoksa yenisini oluştur
const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;

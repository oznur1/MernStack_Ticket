
import { FC } from "react";

const Statistics: FC = async () => {


  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800">
      <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg">
        <div className="text-2xl font-bold">12</div>
        <div className="text-xs text-blue-400/70">Aktif Ticket</div>
      </div>
      <div className="bg-green-900/20 text-green-400 p-3 rounded-lg">
        <div className="text-2xl font-bold">8</div>
        <div className="text-xs text-green-400/70">Çözüldü</div>
      </div>
      <div className="bg-yellow-900/20 text-yellow-400 p-3 rounded-lg max-md:hidden">
        <div className="text-2xl font-bold">4</div>
        <div className="text-xs text-yellow-400/70">Beklemede</div>
      </div>
      <div className="bg-purple-900/20 text-purple-400 p-3 rounded-lg max-md:hidden">
        <div className="text-2xl font-bold">2.5</div>
        <div className="text-xs text-purple-400/70">Ort. Öncelik</div>
      </div>
    </div>
  );
};

export default Statistics;
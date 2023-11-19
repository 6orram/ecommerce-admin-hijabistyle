import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SeasonColumn } from "./components/columns";
import { SeasonsClient } from "./components/client";



const SeasonsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizes = await prismadb.season.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSeasons: SeasonColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SeasonsClient data={formattedSeasons} />
      </div>
    </div>
  );
};

export default SeasonsPage;

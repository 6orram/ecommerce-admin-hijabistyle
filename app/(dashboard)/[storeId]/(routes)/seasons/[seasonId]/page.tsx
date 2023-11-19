import prismadb from "@/lib/prismadb";

import { SeasonForm } from "./components/season-form";

const SeasonPage = async ({
  params
}: {
  params: { seasonId: string }
}) => {
  const season = await prismadb.season.findUnique({
    where: {
      id: params.seasonId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SeasonForm initialData={season} />
      </div>
    </div>
  );
}

export default SeasonPage;

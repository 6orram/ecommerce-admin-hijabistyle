"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, SeasonColumn } from "./columns";

interface SeasonsClientProps {
  data: SeasonColumn[];
}

export const SeasonsClient: React.FC<SeasonsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Seasons (${data.length})`} description="Manage seasons for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/seasons/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Seasons" />
      <Separator />
      <ApiList entityName="seasons" entityIdName="seasonId" />
    </>
  );
};

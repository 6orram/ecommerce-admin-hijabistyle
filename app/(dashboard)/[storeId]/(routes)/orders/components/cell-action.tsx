"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data,
  }) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const onChange = async () => {
      try {
        setLoading(true);
  
        // Toggle the isPaid value
        const updatedIsPaid = !data.isPaid;
  
        // Update the isPaid value in the server
        await axios.patch(`/api/${params.storeId}/orders/${data.id}`, {
          isPaid: updatedIsPaid,
        });
  
        // Optionally, you can update the UI based on the updated value
        toast.success(`Order ${updatedIsPaid ? 'marked as paid' : 'marked as unpaid'}`);
        
        // Refresh the page or update the UI as needed
        router.refresh();
      } catch (error) {
        toast.error('Error updating order status.');
      } finally {
        setOpen(false);
        setLoading(false);
      }
    };


  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onChange}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
             onClick={() => setOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" /> Switch
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

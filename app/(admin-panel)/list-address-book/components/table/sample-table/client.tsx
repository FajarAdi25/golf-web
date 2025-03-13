"use client";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useEffect } from "react";
import { useCompany } from "@/contexts/CompanyContext";

export const AddressBookClient: React.FC = () => {
  const router = useRouter();
  const { companyData, fetchCompanyData } = useCompany();

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-items-end">
          <h1 className="text-3xl font-bold tracking-tight">
            List Address Book
          </h1>
        </div>
        <Separator />
        <DataTable
          searchKey="company_name"
          columns={columns}
          data={companyData}
        />
      </div>
    </>
  );
};

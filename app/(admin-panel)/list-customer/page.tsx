import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomerClient } from "./components/table/sample-table/client";
import { Breadcrumbs } from "@/components/layout/breadcrumb";
import { getCustomers } from "@/services/customer";
import { users } from "@/data/data";

export default async function ListCustomerPage() {
  // const { data: customers } = await getCustomers();

  const breadcrumbItems = [
    { title: "Admin Panel", link: "/list-customer" },
    { title: "List Customer", link: "/list-customer" },
  ];

  return (
    <>
      <SidebarInset>
        <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>
        <div className="container mx-auto ">
          <CustomerClient data={users} />
        </div>
      </SidebarInset>
    </>
  );
}

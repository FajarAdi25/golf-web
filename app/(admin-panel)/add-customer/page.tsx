import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { users } from "@/data/data";
import { Breadcrumbs } from "@/components/layout/breadcrumb";
import { AddCustomerClient } from "./components/add-customer-client";

export default function AddCustomerPage() {
  const breadcrumbItems = [
    { title: "Admin Panel", link: "/list-customer" },
    { title: "Add Customer", link: "/add-customer" },
    // { title: 'User', link: '/dashboard/user' }
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
        <div className="container max-h-screen ">
          <AddCustomerClient />
        </div>
      </SidebarInset>
    </>
  );
}

import { SearchPanel } from "@/components/search-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {}

const benefitList: BenefitsProps[] = [];

export const SearchSection = () => {
  return (
    <>
      <section className="container">
        <div className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl">
          <div className="pt-10 sm:pt-14 md:pt-20">
            <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
              Search Discount Tee Times
            </h1>
            <div className="block md:block">
              <div className="pt-10">
                <div className="flex items-center justify-center">
                  <div className="w-[860px]">
                    {/* <Suspense fallback={<SearchPanelSkeleton />}>
                      <SearchPanelWrapper />
                    </Suspense> */}
                    {/* Search panel */}
                    <SearchPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

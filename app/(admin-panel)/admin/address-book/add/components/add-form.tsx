"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { COMPANY_CATEGORIES } from "@/constants/categories";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const formSchema = z.object({
  company_name: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_code: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_address: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_address_building: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_street_number: z.string().transform((val) => Number(val) || 0),
  company_street_name: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_building_no: z.string().transform((val) => Number(val) || 0),
  company_building_unit: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_building_name: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_city: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_state: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_country: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_zip_code: z.string().transform((val) => Number(val) || 0),
  company_fax: z.string().transform((val) => Number(val) || 0),
  company_website: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_pic: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_designation: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  company_email: z.string().email({ message: "Field must be email address" }),
  company_phone: z
    .string()
    .min(3, { message: "Field must be at least 3 characters" }),
  categories: z.array(z.number()).default([]),
});

type AddFormValues = z.infer<typeof formSchema>;

interface AddFormProps {
  initialData: any | null;
}

export const AddForm: React.FC<AddFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const action = initialData ? "Save changes" : "Create";

  // Ensure initialData.categories is an array if it exists
  const initialCategories =
    initialData && initialData.categories
      ? Array.isArray(initialData.categories)
        ? initialData.categories
        : []
      : [];

  const defaultValues = initialData
    ? {
        ...initialData,
        categories: initialCategories, // Use the safely processed categories
      }
    : {
        company_name: "",
        company_code: "",
        company_address: "",
        company_address_building: "",
        company_street_number: "",
        company_street_name: "",
        company_building_no: "",
        company_building_unit: "",
        company_building_name: "",
        company_city: "",
        company_state: "",
        company_country: "",
        company_zip_code: "",
        company_fax: "",
        company_website: "",
        company_pic: "",
        company_email: "",
        company_phone: "",
        categories: [],
      };

  const form = useForm<AddFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: AddFormValues) => {
    try {
      setLoading(true);
      // Ensure categories is always an array
      const safeData = {
        ...data,
        categories: Array.isArray(data.categories) ? data.categories : [],
      };

      if (initialData) {
        await axios.post(
          `/api/products/edit-product/${initialData._id}`,
          safeData
        );
      } else {
        const res = await axios.post(`${API_BASE_URL}/customer`, safeData);
        console.log("customer", res);
      }

      toast("Submit Success", {
        description: "Submit has been successful",
      });

      router.refresh();
      router.push(`/admin/address-book/list`);
    } catch (error: any) {
      toast("Uh oh! Something went wrong.", {
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to handle category selection
  const toggleCategory = (categoryId: number) => {
    const currentCategories = form.getValues().categories || [];
    // Ensure currentCategories is an array
    const safeCurrentCategories = Array.isArray(currentCategories)
      ? currentCategories
      : [];

    const updated = safeCurrentCategories.includes(categoryId)
      ? safeCurrentCategories.filter((id) => id !== categoryId)
      : [...safeCurrentCategories, categoryId];

    form.setValue("categories", updated, { shouldValidate: true });
  };

  // Get selected category names for display with safeguards against undefined
  const selectedCategories = form.watch("categories") || [];

  // Ensure we're working with an array
  const safeSelectedCategories = Array.isArray(selectedCategories)
    ? selectedCategories
    : [];

  const selectedCategoryLabels = COMPANY_CATEGORIES.filter((cat) =>
    safeSelectedCategories.includes(cat.id)
  ).map((cat) => cat.label);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Code..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Address..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_address_building"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address Building</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Address Building..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_street_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Street Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Street Number..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_street_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Street Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Street Name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_building_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Building No</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Building No..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_building_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Building Unit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Building Unit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_building_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Building Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Building Name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company City..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company State</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company State..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Country</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Country..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Zip Code..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_fax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Fax</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Fax..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Website..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_pic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company PIC</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company PIC..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Designation</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Designation..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Company Phone.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem className="">
                  <FormLabel>Company Categories</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {selectedCategoryLabels.length > 0
                              ? `${selectedCategoryLabels.length} categories selected`
                              : "Select categories..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandList className="w-full">
                              <CommandGroup>
                                <ScrollArea className="h-60">
                                  {COMPANY_CATEGORIES.map((category) => (
                                    <CommandItem
                                      key={category.id}
                                      value={category.label}
                                      onSelect={() => {
                                        toggleCategory(category.id);
                                        setOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={`mr-2 h-4 w-4 ${
                                          safeSelectedCategories.includes(
                                            category.id
                                          )
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                      {category.label}
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <div className="flex flex-wrap gap-2">
                        {selectedCategoryLabels.map((label) => (
                          <Badge
                            key={label}
                            variant="secondary"
                            className="text-xs"
                          >
                            {label}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 rounded-full"
                              onClick={() => {
                                const categoryId = COMPANY_CATEGORIES.find(
                                  (cat) => cat.label === label
                                )?.id;
                                if (categoryId) toggleCategory(categoryId);
                              }}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {label}</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

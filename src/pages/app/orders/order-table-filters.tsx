import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderID = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        customerName: customerName ?? "",
        orderId: orderID ?? "",
        status: status ?? "all",
      },
    });

  function handleFilter({ customerName, orderId, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  }

  function handleCleanFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");

      return state;
    });
    reset({
      customerName: "",
      orderId: "",
      status: "all",
    });
  }

  return (
    <form
      className="flex items-center  gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filters</span>
      <Input
        className="h-8 w-auto"
        placeholder="ID Order"
        {...register("orderId")}
      />
      <Input
        className="h-8 w-[320px]"
        placeholder="Client Name"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status </SelectItem>
                <SelectItem value="processing">processing</SelectItem>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="delivering">delivering</SelectItem>
                <SelectItem value="delivered">delivered</SelectItem>
                <SelectItem value="canceled">canceled</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Selecionar Filtro
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleCleanFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover Filtro
      </Button>
    </form>
  );
}

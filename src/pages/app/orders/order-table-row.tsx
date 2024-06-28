import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, X } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderDetails } from "./orders-details";
import { OrderStatus, StatusOrder } from "./order-status";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrdersResponse } from "@/api/get-orders";
import { cancelOrder } from "@/api/cancel-order";
import { dispathOrder } from "@/api/dispath-order";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "delivering" | "canceled" | "pending" | "delivered" | "processing";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrdersStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<getOrdersResponse>({
      queryKey: ["orders"],
    });
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<getOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "processing");
      },
    });
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivering");
      },
    });
  const { mutateAsync: dispathOrderFn, isPending: isDispathingOrder } =
    useMutation({
      mutationFn: dispathOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivered");
      },
    });
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button size="xs" variant="outline">
              <Search className="h-3 w-3" />
              <span className="sr-only ">Order Details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: enUS,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <StatusOrder status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("en-us", {
          style: "currency",
          currency: "USD",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispathOrderFn({ orderId: order.orderId })}
            disabled={isDispathingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Delivering
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Delivered
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
        >
          <X className="mr-2 h-3 w-3" /> cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

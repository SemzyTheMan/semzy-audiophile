import React from "react";
import { Package2, Clock, CheckCircle, XCircle } from "lucide-react";
import { useGetpurchasedItemsQuery } from "store/services";
import useGetDetails from "@/hooks/useGetDetails";
import { Skeleton } from "@/components/ui/skeleton";

const MyOrders = () => {
  // Sample orders data - replace with your actual data
  const { userDetails } = useGetDetails();

  const { data, isLoading } = useGetpurchasedItemsQuery({
    id: userDetails?.userId,
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Processing":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package2 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading ? (
        <div className="grid gap-4 p-9">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Skeleton className="h-10 w-full" key={i + 1} />
            ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

          <div className="space-y-6">
            {data?.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-gray-500">
                        Order ID: {order.orderId}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-4 py-4 sm:px-6">
                  <div className="space-y-4">
                    {order.products.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      ₦{order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

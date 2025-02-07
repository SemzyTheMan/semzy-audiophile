import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccess = ({ open, onOpenChange }) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[80vw] sm:w-[500px]">
        <div className="grid grid-cols-1 place-items-center gap-4 text-center">
          <CircleCheck width={24} height={24} className="text-green-500" />
          <p className="text-lg font-medium">Payment Completed Sucessfully</p>
          <button
            onClick={() => router.push("/my-orders")}
            className="text-blue-500 outline-none font-medium text-lg"
          >
            Proceed to view orders
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccess;

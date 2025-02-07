import ShopSection from "../containers/ShopSection";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useGetDetails from "@/hooks/useGetDetails";

function MobileModal({ show, onOpenChange, categories }) {
  const router = useRouter();
  const { userDetails } = useGetDetails();

  const handleLogging = () => {
    if (userDetails?.token) {
      localStorage.removeItem("userDetails");
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <Sheet open={show} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-scroll" side="left">
        <div className="grid items-center mt-[5rem] gap-3">
          <Button
            variant="outline"
            onClick={() => handleLogging()} // Redirect to the login page
          >
            {userDetails?.token ? "Logout" : "Login"}
          </Button>
          <Button
            onClick={() => {
              onOpenChange();
              router.push("/my-orders");
            }}
            className="text-xl text-orange-400 font-medium "
            variant="link"
          >
            My Orders
          </Button>
          <div className="">
            <ShopSection className="!mt-0" homeProducts={categories} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileModal;

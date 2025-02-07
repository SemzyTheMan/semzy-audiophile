import ShopSection from "../containers/ShopSection";
import styles from "../../styles/MobileModal.module.css";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
        <div className="flex justify-start ">
          <Button
            variant="outline"
            onClick={() => handleLogging()} // Redirect to the login page
          >
            {userDetails?.token ? "Logout" : "Login"}
          </Button>
        </div>
        <div className="-mt-[10rem]">
          <ShopSection homeProducts={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileModal;

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { authLogoutService } from "@/services/auth";
import { useUserContext } from "@/hooks/useUserContext";

function NavbarLogoutForm() {
  const { setUser } = useUserContext();

  const handleLogout = async () => {
    await authLogoutService();

    toast.success("User successfully logout");

    setUser(null);
  };

  return (
    <DialogTrigger asChild>
      <form action={handleLogout}>
        <Button type="submit" variant={"default"}>
          Logout
        </Button>
      </form>
    </DialogTrigger>
  );
}

export default NavbarLogoutForm;

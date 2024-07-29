"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import todosLogo from "@/img/todosLogo.png";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NavbarLogoutForm from "@/components/NavbarLogoutForm";
import { useUserContext, useUserOnRefresh } from "@/hooks/useUserContext";

function Navbar() {
  const { user, setUser } = useUserContext();

  useUserOnRefresh(setUser);

  return (
    <div className="flex justify-between items-center bg-slate-300 px-4 py-2 text-black border border-black/10 rounded">
      <Link href="/">
        <Image src={todosLogo} alt="todosLogo" width={40} />
      </Link>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            {user ? user.name : "Acc"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span className="cursor-pointer w-full">Logout</span>
                </DropdownMenuItem>
              </DialogTrigger>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/auth" className="cursor-pointer w-full">
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <NavbarLogoutForm />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Navbar;

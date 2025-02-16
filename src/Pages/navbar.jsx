import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";
import { CheckSquare, ClipboardList, User, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const logoutClicked = async () => {
    const url = "http://localhost:5000/logout";
    const options = {
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckSquare className="text-green-600" />
            <span>Logout Successful!</span>
          </div>
        ),
        description: "You have been logged out.",
        className: "bg-white text-green-600 border border-green-600 shadow-md",
      });
      navigate("/login");
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span>Logout Failed!</span>
          </div>
        ),
        description: "Something went wrong. Try again.",
        className: "bg-white text-red-600 border border-red-600 shadow-md",
      });
    }
  };
  return (
    <NavigationMenu className="bg-white border-b-2 min-w-[100vw] h-[10vh] flex justify-between p-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent flex justify-center space-x-3">
              <ClipboardList size={35} />
              <span className="text-2xl font-bold font-serif">Quizo</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem className="me-5">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <User />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ms-5">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              onClick={logoutClicked}
              className={navigationMenuTriggerStyle()}
            >
              Logout
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

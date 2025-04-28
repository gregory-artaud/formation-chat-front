import { FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { CaretDown, Hash, NotePencil } from "@phosphor-icons/react";

export const SlackSidebar = () => {
  return (
    <>
      <div className="min-w-[70px] text-white bg-[#541a59] z-99999 h-[calc(100vh-40px)]" />
      <SidebarProvider className="w-fit">
        <Sidebar
          variant="inset"
          className="mt-[40px] ml-[70px] h-[calc(100vh-40px)] p-0"
        >
          <SidebarHeader className="p-0 bg-[#531a59]">
            <div className="flex items-center bg-[#67326b] rounded-tl-sm justify-between px-2 py-1">
              <p className="flex items-center gap-1 p-2 text-md font-extrabold text-white hover:bg-[#FFFFFF15] px-2 py-1 w-fit rounded-sm">
                Galadrim
                <CaretDown size={16} />
              </p>
              <div className="p-2 hover:bg-[#FFFFFF15] rounded-sm">
                <NotePencil size={24} color="white" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-[#67326b] px-2 gap-0">
            <ChannelButton isSelected name="general" />
            <ChannelButton name="dev" />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
};

const ChannelButton: FC<{
  isSelected?: boolean;
  name: string;
}> = ({ isSelected = false, name }) => {
  return (
    <div
      className={cn(
        "px-2 py-1 rounded-sm flex items-center gap-2 text-sm w-full",
        {
          "bg-[#f9edff] hover:none color-[#f9edff]": isSelected,
          "text-white hover:bg-[#FFFFFF15]": !isSelected,
        },
      )}
    >
      <Hash size={16} weight="bold" />
      <p>{name}</p>
    </div>
  );
};

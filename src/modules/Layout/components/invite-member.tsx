"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Copy, Link as LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/ui/hint";
import { useWorkspaceStore } from "../store";
import { toast } from "sonner";

const InviteMember = () => {
  const [inviteLink, setInviteLink] = useState("");
  const { selectedWorkspace } = useWorkspaceStore();



 


 

  const copyToClipboard = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard");
    }
  };

  return (
    <DropdownMenu>
      <Hint label="Invite Member">
        <DropdownMenuTrigger asChild>
          <Button className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300">
            <UserPlus className="size-4 text-emerald-400" />
          </Button>
        </DropdownMenuTrigger>
      </Hint>

      <DropdownMenuContent className="w-80 rounded-xl" align="end">
        <div className="p-4">
          <DropdownMenuLabel>Invite to {selectedWorkspace?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

         

          {/* Invite Link Input */}
          <div className="flex gap-2 items-center">
            <Input
              value={inviteLink}
              placeholder="Generate an invite link..."
              readOnly
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!inviteLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Generate Button */}
          <Button
            className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white"
           
          >
            <LinkIcon className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InviteMember;
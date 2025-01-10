import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multi-selector";
import { apiClient } from "@/lib/auth-client";
import { useAppStore } from "@/store/store";
import { ALL_CONTACTS, CREATE_CHANNEL_ROUTE } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export type UserInfo = {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  color?: number;
  profileSetup?: boolean;
};
export type ContactsType = {
  label: string;
  value: string;
};

const CreateChannel = () => {
  const { addChannel } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState<ContactsType[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<ContactsType[]>([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(ALL_CONTACTS, {
        withCredentials: true,
      });
      if (response.status) {
        setSearchedContacts(response.data.contacts);
      }
    };
    getData();
  }, []);

  const createChannel = async () => {
    if (channelName.length > 0 && selectedContacts.length > 0) {
      const response = await apiClient.post(
        CREATE_CHANNEL_ROUTE,
        {
          name: channelName,
          members: searchedContacts.map((contact) => contact.value),
        },
        { withCredentials: true }
      );
      if (response.status) {
        setChannelName("");
        setSelectedContacts([]);
        setNewChannelModal(false);
        addChannel(response.data.chanel);
      }
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill the details for new channel</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={searchedContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  No results found
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;

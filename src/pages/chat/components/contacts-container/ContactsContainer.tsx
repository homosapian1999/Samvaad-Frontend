import { useEffect } from "react";
import ContactDm from "./components/contact-dm/ContactDm";
import ProfileInfo from "./components/profile-info/ProfileInfo";
import Logo from "./Logo";
import { apiClient } from "@/lib/auth-client";
import { CONTACTS_FOR_DM_LIST } from "@/utils/constants";
import { useAppStore } from "@/store/store";
import ContactList from "@/components/ui/ContactList";
import CreateChannel from "./components/create-channel/CreateChannel";

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(CONTACTS_FOR_DM_LIST, {
        withCredentials: true,
      });
      if (response.status) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContacts();
  }, [setDirectMessagesContacts]);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#2f303b] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <ContactDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} isChannel={false} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Title = ({ text }: { text: string }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

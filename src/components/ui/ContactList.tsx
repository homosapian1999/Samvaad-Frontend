import { UserInfo } from "@/pages/chat/components/contacts-container/components/contact-dm/ContactDm";
import { useAppStore } from "@/store/store";
import { Avatar, AvatarImage } from "./avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { ChannelType } from "@/store/slices/chat-slice";

const ContactList = ({
  contacts,
  isChannel = false,
}: {
  contacts: UserInfo[] | ChannelType[];
  isChannel: boolean;
}) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact: UserInfo) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");

    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData.id !== contact.id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {(contacts as UserInfo[]).map((contact) => (
        <div
          key={contact.id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData.id === contact.id
              ? "bg-[#8417ff] hover:bg-[$8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden ">
                {contact?.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`
                        ${
                          selectedChatData && selectedChatData.id === contact.id
                            ? "bg-[ffffff22] border border-white/70"
                            : `${getColor(contact?.color as number)}`
                        }
                        uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full `}
                  >
                    {contact?.firstName
                      ? contact.firstName?.split("").shift()
                      : contact?.email?.split("").shift() ?? ""}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{(contact as ChannelType).channelName} </span>
            ) : (
              <span>
                {`${(contact as UserInfo).firstName} ${
                  (contact as UserInfo).lastName
                }`}{" "}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;

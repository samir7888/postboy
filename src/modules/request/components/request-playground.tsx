import React from "react";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import { useSaveRequest } from "../hooks/request";
import { Unplug } from "lucide-react";
import TabBar from "./tab-bar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditor from "./request-editor";
import SaveRequestToCollectionModal from "@/modules/collections/components/add-request-modal";
import { REST_METHOD } from "@prisma/client";

const RequestPlayground = () => {
  const { tabs, activeTabId, addTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId!);
  const [showSaveModal, setShowSaveModal] = React.useState(false);

  const getCurrentRequestData = () => {
    if (!activeTab)
      return {
        name: "Untitled Request",
        method: REST_METHOD.GET as REST_METHOD,
        url: "www.fb.com",
      };

    return {
      name: activeTab.title,
      method: activeTab.method as REST_METHOD,
      url: activeTab.url,
    };
  };

  useHotkeys("ctrl+s, meta+s", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeTab) {
      toast.error("No active request to save");
      return;
    }
    if (activeTab.collectionId) {
      try {
        await mutateAsync({
          url: activeTab.url,
          name: activeTab.title,
          body: activeTab.body,
          headers: activeTab.headers,
          method: activeTab.method as REST_METHOD,
          parameters: activeTab.parameters,
        });
        toast.success("Request Updated");
      } catch (error) {
        console.error("Failed to update request", error);
        toast.error("Failed to update request");
      }
    }
    else{
      setShowSaveModal(true);
    }
    
  },
  { preventDefault: true, enableOnFormTags: true },
  [activeTab]);

  useHotkeys(
    "ctrl+g, meta+shift+n",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addTab();
      toast.success("New request created");
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
    []
  );
  if (!activeTab) {
    return (
      <div className="flex space-y-4 flex-col h-full items-center justify-center">
        <div className="flex flex-col justify-center items-center h-40 w-40 border rounded-full bg-zinc-900">
          <Unplug size={80} className="text-indigo-400" />
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center gap-8">
            <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">
              Ctrl+G
            </kbd>
            <span className="text-zinc-400 font-semibold">New Request</span>
          </div>
          <div className="flex justify-between items-center gap-8">
            <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">
              Ctrl+S
            </kbd>
            <span className="text-zinc-400 font-semibold">Save Request</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <TabBar />
      <div className="flex-1 overflow-auto">
        <RequestEditor />
      </div>
      <SaveRequestToCollectionModal
      isModalOpen={showSaveModal}
      setIsModalOpen={setShowSaveModal}
      requestData={getCurrentRequestData()}
      initialName={getCurrentRequestData().name}
      />
    </div>
  );
};

export default RequestPlayground;

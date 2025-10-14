"use client";

import { useRequestPlaygroundStore } from "../store/useRequestStore";
import RequestBar from "./requst-bar";
import RequestEditorArea from "./requst-editor-area";

export default function RequestEditor() {
  const { tabs, activeTabId, updateTab } =
    useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  if (!activeTab) return null;

  return (
    <div className="flex flex-col items-center justify-start py-4 px-4">
      <RequestBar tab={activeTab} updateTab={updateTab} />

      <div className="flex flex-1 flex-col w-full justify-start mt-4 items-center ">
        <RequestEditorArea tab={activeTab} updateTab={updateTab} />
      </div>

    </div>
  );
}

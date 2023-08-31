import { create } from "zustand";

export type ModelType =
  | "createChannel"
  | "visitChannel"
  | "deleteChannel"
  | "upgrade"
  | "settings"|"trending";
export interface ModelSchema {
  label: ModelType | null;
  isOpen: boolean;
  onOpen: (label: ModelType) => void;
  onClose: () => void;
}

const UseModel = create<ModelSchema>((set) => ({
  label: null,
  isOpen: false,
  onOpen: (label) => set({ isOpen: true, label }),
  onClose: () => set({ label: null, isOpen: false }),
}));


export default UseModel
import { create } from "zustand";

export const useBearStore = create((set) => ({
  openReactions: false,
  handleReactionVisibility: (booleanValue) =>
    set(() => ({ openReactions: booleanValue })),
}));

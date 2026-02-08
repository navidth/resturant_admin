import { create } from "zustand"

type TableOverview = {
      isGrid: boolean
      setIsGrid: (checked: boolean) => void
}
export const useTableOverviewStore = create<TableOverview>((set) => ({
      isGrid: true,
      setIsGrid: (checked) => set({
            isGrid: checked
      })
}))
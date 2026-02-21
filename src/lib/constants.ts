import { MenuItemProps } from "../types";

export const menuItems: MenuItemProps[] = [
      { id: 1, link: "/", label: "Dine In" },
      { id: 2, link: "/robots", label: "Robots" },
      { id: 3, link: "/tasks", label: "Tasks" },
      { id: 4, link: "/poi", label: "POI" },
];
export const tableItems = [{ name: "A1", seat: 4 }, { name: "A2", seat: 4 }, { name: "A3", seat: 4 }, { name: "A4", seat: 4 }, { name: "A5", seat: 4 }, { name: "A6", seat: 4 }, { name: "B1", seat: 4 }, { name: "B2", seat: 4 }, { name: "B3", seat: 4 }, { name: "B4", seat: 4 }, { name: "B5", seat: 4 }, { name: "B6", seat: 4 }, { name: "B7", seat: 4 }, { name: "C1", seat: 4 }, { name: "C2", seat: 4 }, { name: "C3", seat: 4 }, { name: "C4", seat: 4 }, { name: "C5", seat: 4 }, { name: "C6", seat: 4 }, { name: "R1", seat: 2 }, { name: "R2", seat: 2 }, { name: "R3", seat: 2 }, { name: "G1", seat: 2 }, { name: "G2", seat: 2 }, { name: "D1", seat: 4 }, { name: "D2", seat: 4 }, { name: "D3", seat: 4 }, { name: "D4", seat: 4 }];
export const tableSeatCount: Record<string, number> = {
      A1: 4, A2: 4, A3: 4, A4: 4, A5: 4, A6: 4, B1: 4, B2: 4, B3: 4, B4: 4, B5: 4, B6: 4, B7: 4, C1: 4, C2: 4, C3: 4, C4: 4, C5: 4, C6: 4, R1: 2, R2: 2, R3: 2, G1: 2, G2: 2, D1: 4, D2: 4, D3: 4, D4: 4,
};
export const arrowPosList = ["left", "right", "topLeft", "topRight", "bottomLeft", "bottomRight"] as const;


import { StatusTable } from "@/src/types";
import { create } from "zustand";

export type SeatStatus = "EMPTY" | "NEW_GUEST" | "OCCUPIED" | "WAITING" | "DELIVER";
export type ArrowPos =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type TableStore = {
  isModalOpen: boolean;
  selectedTable: string | null;

  tableStatus: Record<string, StatusTable>;

  // ✅ وضعیت صندلی‌های هر میز (ذخیره دائمی)
  seatsByTable: Record<string, SeatStatus[]>;

  // ✅ وضعیت صندلی‌ها داخل مودال (موقتی تا OK)
  draftSeats: SeatStatus[];
  // ✅ وضعیت دائمی فلش‌ها برای هر میز
  arrowsByTable: Record<string, SeatStatus[]>;

  // ✅ وضعیت موقتی فلش‌ها داخل مودال
  draftArrows: SeatStatus[];

  // ✅ تغییر وضعیت یک فلش
  toggleDraftArrow: (arrowIndex: number) => void;
  // ✅ باز کردن مودال با تعداد صندلی
  openTableModal: (tableName: string, seatCount: number) => void;
  closeModal: () => void;

  setTableStatus: (tableName: string, status: StatusTable) => void;
  cycleStatus: (tableName: string) => void;

  // ✅ فقط یک صندلی تغییر کند
  toggleDraftSeat: (seatIndex: number) => void;

  // ✅ ذخیره نهایی صندلی‌ها برای میز انتخاب شده
  commitDraft: () => void;
};

const statusOrder: StatusTable[] = ["EMPTY", "OCCUPIED"];
const nxtStatus = (current: StatusTable) => {
  const idx = statusOrder.indexOf(current);
  const nextIdx = (idx + 1) % statusOrder.length;
  return statusOrder[nextIdx];
};

// برای تغییر وضعیت صندلی با کلیک (ساده و قابل توسعه)
const seatOrder: SeatStatus[] = ["EMPTY", "NEW_GUEST", "OCCUPIED", "WAITING", "DELIVER"];
const nextSeat = (current: SeatStatus) => {
  const idx = seatOrder.indexOf(current);
  const nextIdx = (idx + 1) % seatOrder.length;
  return seatOrder[nextIdx];
};

export const useTableStore = create<TableStore>((set, get) => ({
  isModalOpen: false,
  selectedTable: null,
  tableStatus: {},
  seatsByTable: {},
  draftSeats: [],
  arrowsByTable: {},
  draftArrows: [],

  openTableModal: (tableName, seatCount) => {
    const existingSeats = get().seatsByTable[tableName];
    // ✅ اگر قبلاً ذخیره شده بود همونو بیار، وگرنه با seatCount بساز
    const initialSeats =
      existingSeats && existingSeats.length === seatCount
        ? existingSeats
        : Array.from({ length: seatCount }, () => "EMPTY" as const);
    const arrowCount = 8;
    const existingArrows = get().arrowsByTable[tableName];

    const initialArrows =
      existingArrows && existingArrows.length === arrowCount
        ? existingArrows
        : Array.from({ length: arrowCount }, () => "EMPTY" as const);

    set({
      isModalOpen: true,
      selectedTable: tableName,
      draftSeats: [...initialSeats],
      draftArrows: [...initialArrows],
    });
    set({
      isModalOpen: true,
      selectedTable: tableName,
      draftSeats: [...initialSeats], // ✅ کپی برای Draft
    });
  },

  closeModal: () =>
    set({
      isModalOpen: false,
      draftArrows: [],
      selectedTable: null,
      draftSeats: [],
    }),

  setTableStatus: (tableName, status) =>
    set((state) => ({
      tableStatus: {
        ...state.tableStatus,
        [tableName]: status,
      },
    })),

  cycleStatus: (tableName) => {
    const current = get().tableStatus[tableName] ?? "EMPTY";
    const update = nxtStatus(current);

    set((state) => ({
      tableStatus: {
        ...state.tableStatus,
        [tableName]: update,
      },
    }));
  },

  toggleDraftSeat: (seatIndex) =>
    set((state) => {
      const copy = [...state.draftSeats];
      const current = copy[seatIndex] ?? "EMPTY";
      copy[seatIndex] = nextSeat(current); // ✅ فقط همون index تغییر می‌کند
      return { draftSeats: copy };
    }),
  toggleDraftArrow: (arrowIndex) =>
    set((state) => {
      const copy = [...state.draftArrows];
      const current = copy[arrowIndex] ?? "EMPTY";
      copy[arrowIndex] = nextSeat(current);
      return { draftArrows: copy };
    }),

  commitDraft: () => {
    const { selectedTable, draftSeats, draftArrows, seatsByTable, arrowsByTable, tableStatus } = get();
    if (!selectedTable) return;

    set({
      seatsByTable: {
        ...seatsByTable,
        [selectedTable]: [...draftSeats],
      },
      arrowsByTable: {
        ...arrowsByTable,
        [selectedTable]: [...draftArrows],
      },
    });
    console.log("first", selectedTable, tableStatus, seatsByTable, draftSeats, arrowsByTable, draftArrows)
  },

}));

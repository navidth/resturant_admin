import { Alert, Modal } from "antd";
import { SeatStatus, useTableStore } from "../stores/slices/cardSlice";

const ModalTable = () => {
  const {
    isModalOpen,
    selectedTable,
    draftSeats,
    closeModal,
    cycleStatus,
    toggleDraftSeat,
    commitDraft,
  } = useTableStore();


  const Seat = ({ seat, idx }: { seat: SeatStatus, idx: number }) => (
    <div
      onClick={() => toggleDraftSeat(idx)}
      title={`Seat ${idx + 1}: ${seat}`}
      style={{
        width: 72,
        height: 72,
        borderRadius: 14,
        border: "2px solid #1f2a44",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        fontWeight: 800,
        background:
          seat === "EMPTY"
            ? "#E6EEF9"
            : seat === "NEW_GUEST"
              ? "#8E44AD"
              : seat === "OCCUPIED"
                ? "#2ECC71"
                : seat === "WAITING"
                  ? "#F1C40F"
                  : "#1F6EE0",
        color: seat === "EMPTY" ? "#1f2a44" : "white",
        boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
      }}
    >
      {idx + 1}
    </div>
  );

  return (
    <Modal
      title={selectedTable ? `Table ${selectedTable}` : "Table"}
      open={isModalOpen}
      onCancel={closeModal}
      onOk={() => {
        if (!selectedTable) return;
        commitDraft();
        cycleStatus(selectedTable);
        closeModal();
      }}
      okText="OK"
      cancelText="Cancel"
    >
      {/* چیدمان میز: نصف بالا، میز وسط، نصف پایین */}
      {selectedTable && (
        <>
          {(() => {
            const seats = draftSeats || [];
            const half = Math.ceil(seats.length / 2);

            const topSeats = seats.slice(0, half);
            const bottomSeats = seats.slice(half);

            return (
              <div
                style={{
                  width: 360,
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateRows: "auto auto auto",
                  gap: 14,
                  justifyItems: "center",
                }}
              >
                {/* بالا */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  {topSeats.map((seat, i) => (
                    <Seat key={i} seat={seat} idx={i} />
                  ))}
                </div>

                {/* میز */}
                <div
                  style={{
                    width: 220,
                    height: 90,
                    borderRadius: 24,
                    background: "#1f2a44",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
                  }}
                >
                  TABLE {selectedTable}
                </div>

                {/* پایین */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  {bottomSeats.map((seat, i) => (
                    <Seat key={i} seat={seat} idx={half + i} />
                  ))}
                </div>
              </div>
            );
          })()}
          <Alert
            title="Click seats to change"
            style={{ marginTop: "40px" }}
            description="EMPTY → NEW_GUEST → OCCUPIED → WAITING → DELIVER"
            type="info"
            showIcon
          />

        </>
      )}

    </Modal>
  );
};

export default ModalTable;

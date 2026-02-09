import { Alert, Button, Modal, Tooltip } from "antd";
import { SeatStatus, useTableStore } from "../stores/slices/cardSlice";
import SideArrow from "./SideArrow";
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


  const Seat = ({ seat, idx }: { seat: SeatStatus, idx: number }) => {
    const background = seat === "EMPTY"
      ? "#E6EEF9"
      : seat === "NEW_GUEST"
        ? "#8E44AD"
        : seat === "OCCUPIED"
          ? "#2ECC71"
          : seat === "WAITING"
            ? "#F1C40F"
            : "#1F6EE0"
    const color = seat === "EMPTY" ? "#1f2a44" : "white"
    return (
      <div>

        <Tooltip title={`Seat ${idx + 1}: ${seat}`} color={background}  >
          <div
            onClick={() => toggleDraftSeat(idx)}
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
              background: background,
              color: color,
              boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
            }}
          >
            {idx + 1}
          </div>
        </Tooltip>

      </div>
    )
  };

  return (
    <Modal
      title={selectedTable ? `Table ${selectedTable}` : "Table"}
      open={isModalOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel"
          danger
          type="primary"
          style={{ width: "100px", height: "50px", fontSize: "18px" }}
          onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          style={{ width: "100px", height: "50px", fontSize: "18px" }}
          onClick={() => {
            if (!selectedTable) return;
            commitDraft();
            cycleStatus(selectedTable);
            closeModal();
          }}
        >
          Save
        </Button>,
      ]}
    >
      {selectedTable && (
        <>
          {(() => {
            const seats = draftSeats || [];
            const half = Math.ceil(seats.length / 2);
            const topSeats = seats.slice(0, half);
            const bottomSeats = seats.slice(half);

            const handleArrowClick = (pos: string) => {
              console.log("arrow clicked:", pos, "table:", selectedTable);
              // اینجا هر کاری خواستی انجام بده
              // مثلا: cycleStatus(selectedTable!) یا call api یا ...
            };

            return (
              <div
                style={{
                  width: 420,
                  margin: "0 auto",
                  position: "relative",
                  padding: 24,
                  display: "grid",
                  gridTemplateRows: "auto auto auto",
                  justifyItems: "center",
                  gap: 14,
                }}
              >
                {/* فلش‌های دور میز (۸ تا مثل عکس) */}
                <SideArrow pos="top" onClick={() => handleArrowClick("top")} />
                <SideArrow pos="bottom" onClick={() => handleArrowClick("bottom")} />
                <SideArrow pos="left" onClick={() => handleArrowClick("left")} />
                <SideArrow pos="right" onClick={() => handleArrowClick("right")} />
                <SideArrow pos="topLeft" onClick={() => handleArrowClick("topLeft")} />
                <SideArrow pos="topRight" onClick={() => handleArrowClick("topRight")} />
                <SideArrow pos="bottomLeft" onClick={() => handleArrowClick("bottomLeft")} />
                <SideArrow pos="bottomRight" onClick={() => handleArrowClick("bottomRight")} />

                {/* بالا */}
                <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
                  {topSeats.map((seat, i) => (
                    <Seat key={i} seat={seat} idx={i} />
                  ))}
                </div>

                {/* میز */}
                <div
                  style={{
                    width: 280,
                    height: 150,
                    borderRadius: 24,
                    background: "#ddd",
                    border: "2px solid #1f2a44",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
                  }}
                >
                  TABLE {selectedTable}
                </div>

                {/* پایین */}
                <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
                  {bottomSeats.map((seat, i) => (
                    <Seat key={half + i} seat={seat} idx={half + i} />
                  ))}
                </div>
              </div>
            )
          })()}
          <Alert
            title="Click seats to change"
            style={{ marginTop: "15px" }}
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

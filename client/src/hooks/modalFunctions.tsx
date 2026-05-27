import React from "react";

type ModalKind = "edit" | "delete" | "create" | null;

export function useModalFunctions<T>() {
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [activeModal, setActiveModal] = React.useState<ModalKind>(null);

  function handleEditClick(item: T) {
    setSelectedItem(item);
    setActiveModal("edit");
  }

  function handleDeleteClick(item: T) {
    setSelectedItem(item);
    setActiveModal("delete");
  }

  function handleCloseModal() {
    setActiveModal(null);
    setSelectedItem(null);
  }

  function handleOpenCreateModal() {
    setActiveModal("create");
  }

  return {
    selectedItem,
    activeModal,
    handleEditClick,
    handleDeleteClick,
    handleCloseModal,
    handleOpenCreateModal,
  };
}
const cards = document.querySelectorAll(".board__card");
const draggableAreas = document.querySelectorAll(".board__draggable");

function handleDragStart() {
  this.classList.add("dragging");
}

function handleDragEnd() {
  this.classList.remove("dragging");
}

cards.forEach((card) => {
  card.addEventListener("dragstart", handleDragStart);
  card.addEventListener("dragend", handleDragEnd);
});

function getNextDraggableElement(draggableArea, positionY) {
  const draggableCards = [
    ...draggableArea.querySelectorAll(".board__card:not(.dragging)"),
  ];

  return draggableCards.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = positionY - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function handleDragOver(event) {
  event.preventDefault();
  const nextDraggableElement = getNextDraggableElement(this, event.clientY);
  const currentDraggableElement = document.querySelector(".dragging");

  this.classList.add("over");

  if (nextDraggableElement) {
    this.insertBefore(currentDraggableElement, nextDraggableElement);
  } else {
    this.append(currentDraggableElement);
  }
}

function handleDragLeave() {
  this.classList.remove("over");
}

function handleDrop() {
  this.classList.remove("over");
}

draggableAreas.forEach((draggableArea) => {
  draggableArea.addEventListener("dragover", handleDragOver);
  draggableArea.addEventListener("dragleave", handleDragLeave);
  draggableArea.addEventListener("drop", handleDrop);
});

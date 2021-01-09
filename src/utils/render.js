import Abstract from "../view/abstract";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case renderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (oldChild === null || newChild === null || parent === null) {
    throw new Error(`Can't replace nonexistent elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const append = (parent, child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (parent === null || child === null) {
    throw new Error(`Can't replace nonexistent elements`);
  }

  parent.appendChild(child);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};



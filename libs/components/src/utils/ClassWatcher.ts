export class ClassWatcher {
  targetNode: HTMLElement;
  classToWatch: string;
  classAddedCallback: () => void;
  classRemovedCallback: () => void;
  observer: MutationObserver | null;
  lastClassState: boolean;

  constructor(
    targetNode: HTMLElement,
    classToWatch: string,
    classAddedCallback: () => void,
    classRemovedCallback: () => void,
  ) {
    this.targetNode = targetNode;
    this.classToWatch = classToWatch;
    this.classAddedCallback = classAddedCallback;
    this.classRemovedCallback = classRemovedCallback;
    this.observer = null;
    this.lastClassState = targetNode.classList.contains(this.classToWatch);

    this.init();
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback);
    this.observe();
  }

  observe() {
    this.observer?.observe(this.targetNode, { attributes: true });
  }

  disconnect() {
    this.observer?.disconnect();
  }

  mutationCallback: MutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const currentClassState = (
          mutation.target as HTMLElement
        ).classList.contains(this.classToWatch);
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState;
          if (currentClassState) {
            this.classAddedCallback();
          } else {
            this.classRemovedCallback();
          }
        }
      }
    }
  };
}

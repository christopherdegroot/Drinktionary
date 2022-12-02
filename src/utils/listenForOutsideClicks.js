export default function listenForOutsideClicks(
  listening,
  setListening,
  menuRef,
  setIsOpen
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        console.log("logging evt:", evt);
        const cur = menuRef.current;
        const node = evt.target;
        console.log("logging cur:", cur);
        if (cur.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}

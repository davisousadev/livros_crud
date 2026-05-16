import type { ReactNode } from "react";

export function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70  backdrop-blur-sm">
      {children}
    </div>
  );
}

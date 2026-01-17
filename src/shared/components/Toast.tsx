type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-[#1e1e2e] border-2 border-[#39ff14] rounded-lg px-6 py-4 shadow-[0_0_30px_rgba(57,255,20,0.4)]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#39ff14] flex items-center justify-center">
            <svg
              className="w-3 h-3 text-[#121212]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-white font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}

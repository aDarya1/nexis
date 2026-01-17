import { cn } from "@/shared/utils/cn";

export function Footer() {
  const authors = [
    { name: "Darya Atroshchyk", album: "81829" },
    { name: "Dzmitry Varonin", album: "81138" },
  ];

  return (
    <footer className={cn("border-t mt-auto", "bg-surface border-border")}>
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Authors */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-primary">
              Autorzy
            </h3>
            <ul className="space-y-2">
              {authors.map((author, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {index + 1}. {author.name}
                  {author.album && (
                    <span className="ml-2 text-muted-foreground">
                      {" "}
                      nr. albumu {author.album}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* University */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-primary">
              Uczelnia
            </h3>
            <p className="text-sm text-muted-foreground">UWSB Merito Gdańsk</p>
          </div>

          {/* Year */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-primary">
              Rok
            </h3>
            <p className="text-sm text-muted-foreground">2026</p>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © 2026 nexis. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}

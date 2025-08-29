export default function Footer() {
  return (
    <footer className="mx-auto my-6 max-w-6xl px-8 text-center text-sm text-muted-foreground lg:text-left">
      <p>
        Powered by{" "}
        <a
          href="https://togetherai.link"
          target="_blank"
          className="underline underline-offset-2 transition hover:text-brand"
        >
          Together.ai
        </a>{" "}
        &{" "}
        <a
          href="https://togetherai.link"
          target="_blank"
          className="underline underline-offset-2 transition hover:text-brand"
        >
          {/* Llama 3.2 */}
          Arcee AI Spotlight
        </a>
      </p>
    </footer>
  );
}

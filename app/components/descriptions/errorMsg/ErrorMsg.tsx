
import { MehIcon } from "lucide-react";

export default function ErrorMsg({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="errorMsg">
      <span>
        <MehIcon size={20} />
      </span>
      <p>{message}</p>
    </div>
  );
}

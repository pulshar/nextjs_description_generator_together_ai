

import CardDescriptions from "./components/descriptions/CardDescriptions";
import CardForm from "./components/form/CardForm";

export default function Page() {
  return (
    <div className="my-0 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <CardForm />
      <CardDescriptions />
    </div>
  );
}

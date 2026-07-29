import DaltCustomizer from "./CustomExperience";
import CustomExtras from "./CustomExtras";

export default function Custom() {
  return (
    <div className="bg-black w-full min-h-screen">
      <DaltCustomizer />

      <CustomExtras />
    </div>
  );
}
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 h-full">
      <Skeleton height={200} className="mb-4 rounded-xl" baseColor="#1f1f1f" highlightColor="#333" />
      <Skeleton height={20} width="80%" className="mb-2" baseColor="#1f1f1f" />
      <Skeleton height={20} width="40%" baseColor="#1f1f1f" />
    </div>
    
  );
}
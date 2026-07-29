interface Props {
  rating: number;
  count: number;
}

export default function ProductRating({
  rating,
  count,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400"
              : "text-gray-600"
          }
        >
          ★
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-400">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}
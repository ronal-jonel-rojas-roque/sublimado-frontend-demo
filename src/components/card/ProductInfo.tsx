interface Props {
  title: string;
}

export default function ProductInfo({
  title,
}: Props) {
  return (
    <h3
      className="
        text-white
        text-md
        font-semibold
        text-center
        mt-4
        line-clamp-1
      "
    >
      {title}
    </h3>
  );
}
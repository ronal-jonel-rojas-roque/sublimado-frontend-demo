import ProductCategoryPage from "../../../components/hooks/ProductCategoryPage";


export default function Men() {

  return (
    <ProductCategoryPage
      gender="Hombres"
      description="Potencia tu rendimiento..."
      images={[
        "https://www.animatedimages.org/data/media/106/animated-man-image-0321.gif",
        "https://media.baamboozle.com/uploads/images/86186/1620100173_171205_gif-url.gif",
        "https://img.pikbest.com/png-images/20191028/adults-bring-children-to-the-supermarket-to-shop-dynamic-gif_2515302.png!bw700",
      ]}
      categories={[
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "sports-accessories",
        "sunglasses",
      ]}
      onExplore={() => console.log("Explorar categoría Hombres")}
    />
  );
}
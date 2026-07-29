import ProductCategoryPage from "../../../components/hooks/ProductCategoryPage";

export default function Women() {

  return (
    <ProductCategoryPage
      gender="Mujeres"
      description="Movimiento, estilo y libertad..."
      images={[
        "https://usagif.com/wp-content/uploads/gifs/black-cat-24.gif",
        "https://i.pinimg.com/originals/fa/fa/c7/fafac7d85c468a33349ee27e7d2e646c.gif",
        "https://i.pinimg.com/originals/15/a9/38/15a93837a3ecde5c95645f12d27a978f.gif",
      ]}

      categories={[
        "tops",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches",
        "beauty",
        "skin-care",
      ]}
      onExplore={() => console.log("Explorar categoría Mujeres")}
    />
  );
}
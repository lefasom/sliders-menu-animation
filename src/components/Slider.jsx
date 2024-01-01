import { ImageSlider } from "./ImageSlider"
import p1 from "../../public/modelos/1.jpg"
import p2 from "../../public/modelos/2.jpg"
import p3 from "../../public/modelos/3.jpg"
import p4 from "../../public/modelos/4.jpg"
import p5 from "../../public/modelos/5.jpg"
import p6 from "../../public/modelos/6.jpg"
console.log(p1)

const IMAGES = [
  { url: p1.src, alt: "Model One" },
  { url: p2.src, alt: "Model Two" },
  { url: p3.src, alt: "Model Three" },
  { url: p4.src, alt: "Model Four" },
  { url: p5.src, alt: "Model Five" },
  { url: p6.src, alt: "Model six" },
  

]
const Slider = () => {

  return (
    <div
    style={{
      maxWidth: "1200px",
      width: "100%",
      // aspectRatio: "10 / 6",
      margin: "0 auto",
    }}
  >
    <ImageSlider images={IMAGES} />
    <a href="/" style={{ fontSize: "4rem" }}>
      Link
    </a>
  </div>
  );
};
export default Slider
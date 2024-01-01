import { useEffect, useState } from "react"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import "./image-slider.css"

type ImageSliderProps = {
  images: {
    url: string
    alt: string
  }[]
}
const Circle = () => {
  return <div
    style={{
      background: "#888",
      borderRadius: "100%",
    }}
  ></div>
}
const CircleDot = () => {
  return <div
    style={{
      background: "#eee",
      borderRadius: "100%",
    }}
  ></div>
}
export function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)
  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 3) return 0
      return index + 1
    })
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }
  function showNextImageMob() {
    setImageIndex(index => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  function showPrevImageMob() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }
    let interval;

    function handleInterval() {
      if (window.innerWidth < 768) {
        interval = setInterval(showNextImageMob, 2000);
      } else {
        interval = setInterval(showNextImage, 2000);
      }
    }
  useEffect(() => {


    handleInterval(); // Ejecutar al inicio para establecer el intervalo correcto

    const resizeListener = () => {
      clearInterval(interval); // Limpiar el intervalo actual al cambiar el tamaño de la pantalla
      handleInterval(); // Volver a asignar el intervalo basado en la nueva resolución
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      clearInterval(interval); // Limpiar el intervalo al desmontar el componente
      window.removeEventListener("resize", resizeListener);
    };
  }, [images.length]); // Dependencia añadida para asegurarse de que el efecto se ejecute si cambian las imágenes

  return (
    <section
      aria-label="Image Slider"
      style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div

        style={{
          height: "100%",
          width: "75%",
          display: "flex",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>
      <div className="desktop">
        <button
          onClick={showPrevImage}
          className="img-slider-btn"
          style={{ left: 0 }}
          aria-label="View Previous Image"
        >
          <ArrowBigLeft aria-hidden />
        </button>
        <button
          onClick={showNextImage}
          className="img-slider-btn"
          style={{ right: 0 }}
          aria-label="View Next Image"
        >
          <ArrowBigRight aria-hidden />
        </button>
      </div>
      <div className="mobile">
        <button
          onClick={showPrevImageMob}
          className="img-slider-btn"
          style={{ left: 0 }}
          aria-label="View Previous Image"
        >
          <ArrowBigLeft aria-hidden />
        </button>
        <button
          onClick={showNextImageMob}
          className="img-slider-btn"
          style={{ right: 0 }}
          aria-label="View Next Image"
        >
          <ArrowBigRight aria-hidden />
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        <div className="desktop"
          style={{
            position: "absolute",
            bottom: ".5rem",
            left: "50%",
            translate: "-50%",
            gap: ".25rem",
          }}>
          {images.slice(0, images.length - 2).map((_, index) => (
            <button
              key={index}
              className="img-slider-dot-btn"
              aria-label={`View Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
            >
              {index === imageIndex ? (
                <CircleDot aria-hidden />
              ) : (
                <Circle aria-hidden />
              )}
            </button>
          ))}
        </div>
        <div className="mobile"
          style={{
            position: "absolute",
            bottom: ".5rem",
            left: "50%",
            translate: "-50%",
            gap: ".25rem",
          }}>
          {images.map((_, index) => (
            <button
              key={index}
              className="img-slider-dot-btn"
              aria-label={`View Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
            >
              {index === imageIndex ? (
                <CircleDot aria-hidden />
              ) : (
                <Circle aria-hidden />
              )}
            </button>
          ))}
        </div>
      </div>
      <div id="after-image-slider-controls" />
    </section>
  )
}
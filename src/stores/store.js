import { writable } from "svelte/store";

// Calculate initial values
const containerWidth = document.documentElement.clientWidth || window.innerWidth;
const isMobile = containerWidth < 730;

export const formatNumber = (number) => {
  return number.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const state = writable({
    isMobile ,
    containerWidth,
  candidatesDetails: {
    massa: {
      name: "Sergio",
      lastname: "Massa",
      img: "https://elecciones2023paso.lanacion.com.ar/admin/media/candidatos_fotos/sergio_Massa_2.png?format=webp&width=100",
    },
    bullrich: {
      name: "Patricia",
      lastname: "bullrich",
      img: "https://elecciones2023paso.lanacion.com.ar/admin/media/candidatos_fotos/patricia-bullrich-2.png?format=webp&width=100",
    },
    milei: {
      name: "Javier",
      lastname: "Milei",
      img: "https://elecciones2023paso.lanacion.com.ar/admin/media/candidatos_fotos/javier-milei-2.png?format=webp&width=100",
    },
    bregman: {
      name: "Myriam",
      lastname: "Bregman",
      img: "https://elecciones2023paso.lanacion.com.ar/admin/media/candidatos_fotos/Miryam_Bregman-2.png?format=webp&width=100",
    },
    schiaretti: {
      name: "Juan",
      lastname: "Schiaretti",
      img: "https://elecciones2023paso.lanacion.com.ar/admin/media/candidatos_fotos/juan-schiaretti-2.png?format=webp&width=100",
    },
  },
  description: "title from sveltes store",
  counter: 0, // New counter variable
});

if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
        state.update(currentState => ({
            ...currentState,
            containerWidth: document.documentElement.clientWidth || window.innerWidth,
            isMobile: (document.documentElement.clientWidth || window.innerWidth) < 730,
        }));
    });
}
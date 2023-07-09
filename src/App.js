import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [filtrele, setFiltrele] = useState("");
  const [urun, setUrun] = useState([]);
  const [filtrelenenler, setFiltrelenenler] = useState(urun);
  const [kupon, setKupon] = useState("");
  const [indirim, setIndirim] = useState(1);
  useEffect(() => {
    urunGetir();
  }, []);

  const urunGetir = async () => {
    const urunler = await fetch("https://fakestoreapi.com/products");
    const urunjson = await urunler.json();
    setUrun(urunjson);
  };

  const kuponInputChange = (event) => {
    const inputValue = event.target.value;
    setKupon(inputValue);
  };

  const click = () => {
    var yilibul = kupon.substring(0, 4);
    yilibul = parseInt(yilibul);
    const yil = 2023 - yilibul;
    const E = parseInt(kupon.substring(8, 9));
    const F = parseInt(kupon.substring(9, 10));
    const G = parseInt(kupon.substring(10, 11));
    const H = parseInt(kupon.substring(11, 12));
    const promosyon = (E * yil ** 3 + F * yil ** 2 + G * yil + H) / yil ** 4;
    const promosyonluFiyat = 1 - promosyon;
    setIndirim(promosyonluFiyat);
  };

  const inputChange = (event) => {
    const inputValue = event.target.value;
    const filtrele = urun.filter((urun) =>
      urun.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltrele(inputValue);
    setFiltrelenenler(filtrele);
  };
  const tarih = new Date().toJSON().slice(0, 10);
  return (
    <div className="App">
      <div className="searchdiv">
        <input
          className="input"
          type="text"
          onChange={inputChange}
          value={filtrele}
          placeholder="Aramak için bir isim girin."
        />
      </div>
      <div className="kupondiv">
        <input
          className="input"
          type="text"
          onChange={kuponInputChange}
          placeholder="Kupon Kodunuzu Girin"
        />
        <button className="buton" onClick={click}>
          Kuponu Uygula
        </button>
      </div>
      <div className="container">
        {filtrelenenler.map((urun) => (
          <div key={urun.id} className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
              <img src={urun.image} alt="w" />
            </div>
            <div className="product-details">
              <span className="product-catagory">{urun.category}</span>
              <h4>
                <a href="/">{urun.title}</a>
              </h4>
              <p>{urun.description}</p>
              <div className="product-bottom-details">
                <div className="product-price">{urun.price} $</div>
                <div className="product-price">
                  Promosyonlu Fiyat: {(indirim * urun.price).toFixed(2)} $
                </div>
                <div className="product-price">
                  Stokta {urun.rating.count} adet
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3>Bu Sorgu {tarih} tarihinde yapıldı.</h3>
    </div>
  );
}

export default App;

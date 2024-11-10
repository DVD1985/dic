import { useState, useEffect } from "react";
const SearchBar = () => {
  const [valor, setValor] = useState("");
  const [palabras, setPalabras] = useState([]);
  const [definicion, setDefinicion] = useState([]);
  const autocomplete = async (e) => {
    setValor(e.target.value);
  };
  useEffect(() => {
    if (valor === "") {
      setPalabras([]);
      setDefinicion([]);
      return;
    };
    const getAutocomplete = async function (palabra) {
      const response = await fetch("http://localhost:5000/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ palabra }),
      });
      const respuesta = await response.json();
      setPalabras(JSON.parse(respuesta));
    };
    getAutocomplete(valor);
  }, [valor]);
  const getDefinicion = async function () {
    const palabra = busqueda.value;
    console.log(palabra)
    const response = await fetch("http://localhost:5000/palabra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ palabra }),
    });
    const respuesta = await response.text();
    setDefinicion(JSON.parse(respuesta));
    console.log(definicion)
  }  
  return (
    <>
      <div className="contenedor">
        <input
          type="text"
          placeholder="Palabra..."
          onChange={(e) => autocomplete(e)}
          onInput={(e) => autocomplete(e)}
          id="busqueda"
        />
        <button type="submit" onClick={getDefinicion} >Buscar</button>
      </div>
      <div className={`${definicion.length > 0 ? "hidden" : ""} posibilidades`}>
        {palabras.length > 0 && <h2>Posibles palabras</h2>}
        {palabras.map( palabra => (<div className="palabra" key={palabra} onClick={()=> {busqueda.value = palabra.split("|")[0]}}>{palabra}</div>) )}
      </div>
      {definicion.length > 0 && <h2>Definiciones</h2>}
      {definicion.map( definicion => (<div className="definicion" key={definicion}>{definicion}</div>) )}
    </>
  );
};

export default SearchBar;

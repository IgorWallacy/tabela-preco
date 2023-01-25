import React, { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "./App.css";

import Logo from "./assets/img/logo.png";

import api from "./services/axios";

import api2 from "./services/axiosXmlNews";

import "animate.css";

import Speech from "react-speech";

import moment from "moment";

function App() {
  const [senhaTelaCheia, setSenhaTelaCheia] = useState(false);
  const [senhaPrioridadeTelaCheia, setSenhaPrioridadeTelaCheia] =
    useState(false);

  const [senha, setSenha] = useState(0);
  const [senhaPrioridade, setSenhaPrioridade] = useState(0);

  const [ultimaSenha, setUltimaSenha] = useState(false);

  const [noticias, setNoticias] = useState([]);
  const [totalNoticias, setTotalNoticias] = useState(20);

  const data = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1004",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1005",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
    {
      id: "1006",
      code: "bib36pfvm",
      name: "Chakra Bracelet",
      description: "Product Description",
      image: "chakra-bracelet.jpg",
      price: 32,
      category: "Accessories",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1007",
      code: "mbvjkgip5",
      name: "Galaxy Earrings",
      description: "Product Description",
      image: "galaxy-earrings.jpg",
      price: 34,
      category: "Accessories",
      quantity: 23,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1008",
      code: "vbb124btr",
      name: "Game Controller",
      description: "Product Description",
      image: "game-controller.jpg",
      price: 99,
      category: "Electronics",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
    {
      id: "1009",
      code: "cm230f032",
      name: "Gaming Set",
      description: "Product Description",
      image: "gaming-set.jpg",
      price: 299,
      category: "Electronics",
      quantity: 63,
      inventoryStatus: "INSTOCK",
      rating: 3,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1004",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1005",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
    {
      id: "1006",
      code: "bib36pfvm",
      name: "Chakra Bracelet",
      description: "Product Description",
      image: "chakra-bracelet.jpg",
      price: 32,
      category: "Accessories",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1007",
      code: "mbvjkgip5",
      name: "Galaxy Earrings",
      description: "Product Description",
      image: "galaxy-earrings.jpg",
      price: 34,
      category: "Accessories",
      quantity: 23,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1008",
      code: "vbb124btr",
      name: "Game Controller",
      description: "Product Description",
      image: "game-controller.jpg",
      price: 99,
      category: "Electronics",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
    {
      id: "1009",
      code: "cm230f032",
      name: "Gaming Set",
      description: "Product Description",
      image: "gaming-set.jpg",
      price: 299,
      category: "Electronics",
      quantity: 63,
      inventoryStatus: "INSTOCK",
      rating: 3,
    },
  ];

  const [page, setPage] = useState(1);
  const [linha, setLinha] = useState(1);
  const rowsPerPage = 9; // number of rows to display per page
  //const data = [/* your data */];
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const getNoticias = () => {
    api2
      .get(
        `https://newsapi.org/v2/top-headlines?country=br&apiKey=449d30ca9a734c32bb60df79a52619ca`
      )
      .then((response) => {
        setNoticias(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNoticias();

    const intervalId = setInterval(() => {
      setLinha((total) => {
        if (total <= noticias.length || total <= totalNoticias) {
          return total + 1;
        }
        return 1;
      });
      setPage((prevPage) => {
        if (prevPage === totalPages) {
          return 1;
        }
        return prevPage + 1;
      });
    }, 30000);
    return () => clearInterval(intervalId);
  }, [totalPages]);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const startIndexN = (linha - 1) * 1;
  const endIndexN = startIndexN + 1;

  const currentPageData = data.slice(startIndex, endIndex);

  const currentPageDataNews = noticias.slice(startIndexN, endIndexN);

  const incrementSenha = () => {
    setSenhaTelaCheia(true);
    setUltimaSenha(true);

    return setSenha(senha + 1);
  };

  const decrementSenha = () => {
    return setSenha(senha - 1);
  };

  const decrementSenhaPrioridade = () => {
    return setSenhaPrioridade(senhaPrioridade - 1);
  };

  const incrementSenhaPrioridade = () => {
    setSenhaPrioridadeTelaCheia(true);
    setUltimaSenha(false);

    return setSenhaPrioridade(senhaPrioridade + 1);
  };

  return (
    <>
      <div className="w-full p-1 flex gap-10 items-stretch justify-between">
        <img style={{ width: "200px" }} className="m-1" src={Logo} />



        <div className="flex justify-end items-end"></div>

        <div className="flex justify-end items-end gap-1">
          <div className="text-white mx-1 px-1">
            <h1>Normal</h1>

            <Button
              style={{ margin: '5px' }}
              className="p-button p-button-rounded p-button-primary"
              icon="pi pi-minus"
              onClick={decrementSenha}
            />
            <Button
              style={{ margin: '5px' }}
              className="p-button p-button-rounded p-button-success "
              icon="pi pi-plus"
              onClick={incrementSenha}
            />
          </div>

          <h2 className="text-5xl text-start text-white">SENHA</h2>
          <h1 className=" text-9xl m-1 font-semibold text-white">

            {senha}
          </h1>

          <div className="text-white mx-1 px-1">
            <h1>Prioridade</h1>

            <Button
              style={{ margin: '5px' }}
              className="p-button p-button-rounded p-button-primary "
              icon="pi pi-minus"
              onClick={decrementSenhaPrioridade}
            />
            <Button
              style={{ margin: '5px' }}
              className="p-button p-button-rounded p-button-success "
              icon="pi pi-plus"
              onClick={incrementSenhaPrioridade}
            />
          </div>







          <h2 className="text-5xl text-start text-white">PREFERENCIAL</h2>
          <h1 className=" text-9xl m-1 font-semibold text-white">

            {senhaPrioridade}
          </h1>


        </div>

        <hr className="m-5" />
      </div>
      <div>
        <table className="w-full shadow-md border-separate p-2">
          <thead>
            <tr className="px-4 py-2 bg-yellow-600">
              <th className=" text-lg text-white border border-slate-600 px-4 py-2">
                Código
              </th>
              <th className=" text-lg text-white border border-slate-600 px-4 py-2">
                Produto
              </th>
              <th className="text-lg text-white border border-slate-600 px-4 py-2">
                Preço
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row, index) => (
              <tr className="even:bg-blue-500 odd:bg-red-500 h-8 " key={index}>
                <td className=" text-white border-spacing-8 border border-slate-700 text-center  font-semibold text-3xl ">
                  {row.code}
                </td>
                <td className=" text-white border-spacing-8 border border-slate-700 text-start  font-semibold text-3xl ">
                  {row.name}
                </td>
                <td className="text-yellow-50 border-spacing-8 border border-slate-700 text-center text-opacity-100  font-semibold text-4xl">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(row.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ticker-wrapper">
        <div className="bigHeading"> Notícias </div>
        <div className=" text-center text-white text-2xl bg-sky-600 w-full relative	">
          {currentPageDataNews.map((m, i) => (
            <h1 key={i}>{m?.title}</h1>
          ))}
        </div>
        <div className="text-update">
          {currentPageDataNews.map((m, i) => (
            <p key={i}>{` ${m?.description}`} </p>
          ))}
        </div>
      </div>

      <Dialog
        position="top-left"
        className="text-5xl text-center "
        header="Atenção cliente amigo"
        visible={senhaTelaCheia}
        modal={false}
        style={{ width: "100%" }}
        onHide={() => setSenhaTelaCheia(false)}
      >
        <div className="flex justify-center items-center gap-5">
          <h1 className="text-9xl animate__animated animate__pulse animate__infinite">
            SENHA {senha}
          </h1>
          <h2 className="text-5xl">
            <Speech
              className="rs-play"
              lang="pt-BR"
              textAsButton
              displayText="Chamar"
              resume
              text={`Atenção cliente amigo, senha ${senha}`}
            />
          </h2>
          <Button
            label="Fechar"
            onClick={() => setSenhaTelaCheia(false)}
            className="p-button p-button-rounded p-button-danger p-button-lg"
          />
        </div>
      </Dialog>

      <Dialog
        position="top-left"
        className="text-9xl text-center "
        header="Atenção cliente amigo, Prioridade "
        visible={senhaPrioridadeTelaCheia}
        modal={false}
        style={{ width: "100%" }}
        onHide={() => setSenhaPrioridadeTelaCheia(false)}
      >
        <div className="flex justify-center items-center gap-5">
          <h1 className="text-7xl animate__animated animate__pulse animate__infinite">
            PREFERENCIAL {senhaPrioridade}
          </h1>
          <h2 className="text-5xl">
            <Speech
              className="rs-play"
              lang="pt-BR"
              textAsButton
              displayText="Chamar"
              resume
              text={`Atenção senha preferencial ${senhaPrioridade}`}
            />
          </h2>
          <Button
            label="Fechar"
            onClick={() => setSenhaPrioridadeTelaCheia(false)}
            className="p-button p-button-rounded p-button-danger p-button-lg"
          />
        </div>
      </Dialog>
    </>
  );
}

export default App;
